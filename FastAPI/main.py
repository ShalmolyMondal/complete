from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import json
import time
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


@app.websocket("/websocket")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        cleanData = cleanValues(json.loads(await websocket.receive_text()))
        lst = []
        for i in cleanData:
            lst.append(
                {
                    "inference": getSituationInference(
                        i["situation_name"],
                        i["fuzzy_selection"],
                        i["fuzzy_rules"],
                    ),
                    "certainity": getCertainity(i["fuzzy_selection"]),
                    "timestamp": time.time(),
                }
            )
        result = {"data": lst}
        await websocket.send_text(f"{result}")
