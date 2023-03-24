from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import json
import time
import requests
import skfuzzy as skf
from helper import cleanValues, getSituationInference, getCertainity


app = FastAPI()  # creating API object

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_weather(object):
    weather = object.get("weather")
    response = {"weather": [{"main": None}]}
    if weather != None:
        response = requests.get(
            "http://api.openweathermap.org/data/2.5/weather?lat={0}&lon={1}&limit=5&appid=697029433b61df35c0e34a60d34cccba".format(
                weather["lat"], weather["long"]
            ),
        ).json()

        print(response)

    return {
        "weather_condition": response["weather"][0]["main"],
    }


@app.websocket("/websocket")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        cleanData = cleanValues(json.loads(await websocket.receive_text()))

        lst = []
        for key, i in enumerate(cleanData):
            lst.append(
                {
                    "TrafficScenarioApplication_Situations": getSituationInference(
                        "situation_name",
                        get_weather(cleanData[key]),
                        i["fuzzy_selection"],
                        i["fuzzy_rules"],
                    ),
                    "situation_inference": getCertainity(i["fuzzy_selection"]),
                    "timestamp": time.time(),
                }
            )
        result = {"data": lst}
        await websocket.send_text(f"{result}")
