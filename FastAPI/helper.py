import pydash
import numpy as np
import skfuzzy as skf


weatherConditions = {
    "Thunderstorm": "low_traffic",
    "Drizzle": "moderate_trafiic",
    "Rain": "high_traffic",
    "Snow": "moderate_trafiic",
    "Clear": "high_traffic",
    "Clouds": "moderate_trafiic",
    "Mist": "low_traffic",
    "Smoke": "low_traffic",
    "Haze": "low_traffic",
    "Dust": "low_traffic",
    "Fog": "low_traffic",
    "Sand": "low_traffic",
    "Dust": "low_traffic",
    "Ash": "low_traffic",
    "Squall": "low_traffic",
    "Tornado": "low_traffic",
}


def filter(obj):
    if "context_attributes" in obj:
        del obj["context_attributes"]

    return obj


def cleanValues(data=[]):
    return pydash.for_each(data, filter)


def determineSituation(fuzzyattr, rules, ca):
    def compare(x):
        if (
            x[ca["ca1"].strip()] == fuzzyattr["fuzzyness_ca1"]
            and x[ca["ca2"].strip()] == fuzzyattr["fuzzyness_ca2"]
            and x[ca["ca3"].strip()] == fuzzyattr["fuzzyness_ca3"]
        ):
            return True

    return pydash.filter_(rules, compare)


def weatherInference(condition):
    for i in weatherConditions.keys():
        if i == condition:
            return weatherConditions[i]


def getSituationInference(name, weather, data=[], rules={}):
    [ca1, ca2, ca3] = list(dict.keys(data))

    fuzzyness_ca1 = data[ca1]["fuzzyness"].strip()
    fuzzyness_ca2 = data[ca2]["fuzzyness"].strip()
    fuzzyness_ca3 = data[ca3]["fuzzyness"].strip()

    detSit = determineSituation(
        {
            "fuzzyness_ca1": fuzzyness_ca1,
            "fuzzyness_ca2": fuzzyness_ca2,
            "fuzzyness_ca3": fuzzyness_ca3,
        },
        rules,
        {"ca1": ca1, "ca2": ca2, "ca3": ca3},
    )

    __weather = weatherInference(weather["weather_condition"])

    inferredValue = ""

    if __weather == "low_traffic" and detSit[0]["situation"] == "low_traffic":
        inferredValue = "low_traffic"
    elif __weather == "low_traffic" and detSit[0]["situation"] == "moderate_traffic":
        inferredValue = "low_traffic ~ moderate_traffic"
    elif __weather == "low_traffic" and detSit[0]["situation"] == "high_traffic":
        inferredValue = "moderate_traffic"
    elif __weather == "moderate_traffic" and detSit[0]["situation"] == "low_traffic":
        inferredValue = "low_traffic ~ moderate_traffic"
    elif (
        __weather == "moderate_traffic" and detSit[0]["situation"] == "moderate_traffic"
    ):
        inferredValue = "moderate_traffic"
    elif __weather == "moderate_traffic" and detSit[0]["situation"] == "high-traffic":
        inferredValue = "moderate_traffic ~ high-traffic"
    elif __weather == "high-traffic" and detSit[0]["situation"] == "low_traffic":
        inferredValue = "moderate_traffic"
    elif __weather == "high-traffic" and detSit[0]["situation"] == "moderate_traffic":
        inferredValue = "moderate_traffic ~ high-traffic"
    elif __weather == "high-traffic" and detSit[0]["situation"] == "high-traffic":
        inferredValue = "high-traffic"
    else:
        inferredValue = detSit[0]["situation"]

    return {name: inferredValue}


def get_clean_fuzzy_values(fuzzy_val):
    [ca1, ca2, ca3] = list(dict.keys(fuzzy_val))

    fuzzy_val[ca1]["disclosure"] = pydash.map_(
        fuzzy_val[ca1]["disclosure"].strip().split(" "), lambda x: int(x)
    )
    fuzzy_val[ca2]["disclosure"] = pydash.map_(
        fuzzy_val[ca2]["disclosure"].strip().split(" "), lambda x: int(x)
    )
    fuzzy_val[ca3]["disclosure"] = pydash.map_(
        fuzzy_val[ca3]["disclosure"].strip().split(" "), lambda x: int(x)
    )

    fuzzy_val[ca1]["fuzzyness"] = fuzzy_val[ca1]["fuzzyness"].strip()
    fuzzy_val[ca2]["fuzzyness"] = fuzzy_val[ca2]["fuzzyness"].strip()
    fuzzy_val[ca3]["fuzzyness"] = fuzzy_val[ca3]["fuzzyness"].strip()

    return fuzzy_val


def getCertainity(fuzzy_values):
    cleanValues = get_clean_fuzzy_values(fuzzy_values)
    [ca1, ca2, ca3] = list(dict.keys(cleanValues))

    rand_ca1 = list(
        np.random.randint(
            cleanValues[ca1]["lower_bound"], cleanValues[ca1]["upper_bound"], size=1
        )
    )[0]
    rand_ca2 = list(
        np.random.randint(
            cleanValues[ca2]["lower_bound"], cleanValues[ca2]["upper_bound"], size=1
        )
    )[0]

    rand_ca3 = list(
        np.random.randint(
            cleanValues[ca3]["lower_bound"], cleanValues[ca3]["upper_bound"], size=1
        )
    )[0]

    membership_ca1 = skf.trapmf(np.array([rand_ca1]), cleanValues[ca1]["disclosure"])
    membership_ca2 = skf.trapmf(np.array([rand_ca2]), cleanValues[ca2]["disclosure"])
    membership_ca3 = skf.trapmf(np.array([rand_ca3]), cleanValues[ca3]["disclosure"])

    certainity = (
        list(membership_ca1)[0] * cleanValues[ca1]["weight"]
        + list(membership_ca2)[0] * cleanValues[ca2]["weight"]
        + list(membership_ca3)[0] * cleanValues[ca3]["weight"]
    )

    return {
        "attribute_vales": {"Speed": rand_ca1, "density": rand_ca2, "time": rand_ca3},
        "certainity": certainity,
    }
