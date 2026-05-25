# =========================================================
# app.py
# FINAL COMPLETE FASTAPI BACKEND
# DISEASE RISK PREDICTION + LOGIN + REGISTER
# =========================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import numpy as np
import joblib

# =========================================================
# LOAD MODELS
# =========================================================

heart_model = joblib.load(
    "models/heart_model.pkl"
)

heart_scaler = joblib.load(
    "models/heart_scaler.pkl"
)

diabetes_model = joblib.load(
    "models/diabetes_model.pkl"
)

diabetes_scaler = joblib.load(
    "models/diabetes_scaler.pkl"
)

mental_model = joblib.load(
    "models/mental_model.pkl"
)

mental_scaler = joblib.load(
    "models/mental_scaler.pkl"
)

# =========================================================
# LOAD ENCODERS
# =========================================================

gender_encoder = joblib.load(
    "models/gender_encoder.pkl"
)

smoking_encoder = joblib.load(
    "models/smoking_encoder.pkl"
)

mental_label_encoders = joblib.load(
    "models/mental_label_encoders.pkl"
)

# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(

    title="Disease Risk Prediction API",

    description="AI + ML Disease Prediction System",

    version="1.0"

)

# =========================================================
# CORS
# =========================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)

# =========================================================
# DEMO USER
# =========================================================

demo_user = {

    "username": "veda",

    "email": "veda@gmail.com",

    "password": "1234"

}

# =========================================================
# HOME ROUTE
# =========================================================

@app.get("/")
def home():

    return {

        "message":
        "Disease Risk Prediction API Running"

    }

# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():

    return {

        "status":
        "Backend Working Successfully"

    }

# =========================================================
# REGISTER ROUTE
# =========================================================

@app.post("/register")
def register(data: dict):

    return {

        "message":
        "Registration Successful"

    }

# =========================================================
# LOGIN ROUTE
# =========================================================

@app.post("/login")
def login(data: dict):

    if (

        data["email"] ==
        demo_user["email"]

        and

        data["password"] ==
        demo_user["password"]

    ):

        return {

            "message":
            "Login Successful",

            "username":
            demo_user["username"]

        }

    return {

        "error":
        "Invalid Email or Password"

    }

# =========================================================
# HEART DISEASE PREDICTION
# =========================================================

@app.post("/predict/heart")
def predict_heart(data: dict):

    try:

        features = pd.DataFrame([{

            "age": data["age"],

            "sex": data["sex"],

            "trestbps": data["trestbps"],

            "chol": data["chol"],

            "fbs": data["fbs"],

            "thalach": data["thalach"],

            "exang": data["exang"]

        }])

        # =================================================
        # SCALE
        # =================================================

        scaled_data = heart_scaler.transform(
            features
        )

        # =================================================
        # PREDICT
        # =================================================

        prediction = heart_model.predict(
            scaled_data
        )[0]

        probability = heart_model.predict_proba(
            scaled_data
        )[0][1]

        risk_percentage = round(
            probability * 100,
            2
        )

        # =================================================
        # RESULT + TIPS
        # =================================================

        if prediction == 1:

            result = "High Heart Disease Risk"

            tips = [

                "Reduce oily foods",

                "Exercise regularly",

                "Monitor blood pressure",

                "Avoid smoking",

                "Reduce stress"

            ]

        else:

            result = "Low Heart Disease Risk"

            tips = [

                "Maintain healthy lifestyle",

                "Continue regular exercise",

                "Eat balanced diet",

                "Stay hydrated",

                "Regular health checkups"

            ]

        return {

            "Prediction": result,

            "RiskPercentage": risk_percentage,

            "Tips": tips

        }

    except Exception as e:

        return {

            "error": str(e)

        }

# =========================================================
# DIABETES PREDICTION
# =========================================================

@app.post("/predict/diabetes")
def predict_diabetes(data: dict):

    try:

        gender = gender_encoder.transform(
            [data["gender"]]
        )[0]

        smoking = smoking_encoder.transform(
            [data["smoking_history"]]
        )[0]

        features = pd.DataFrame([{

            "gender": gender,

            "age": data["age"],

            "hypertension":
            data["hypertension"],

            "heart_disease":
            data["heart_disease"],

            "smoking_history":
            smoking,

            "bmi": data["bmi"],

            "HbA1c_level":
            data["HbA1c_level"],

            "blood_glucose_level":
            data["blood_glucose_level"]

        }])

        # =================================================
        # SCALE
        # =================================================

        scaled_data = diabetes_scaler.transform(
            features
        )

        # =================================================
        # PREDICT
        # =================================================

        prediction = diabetes_model.predict(
            scaled_data
        )[0]

        probability = diabetes_model.predict_proba(
            scaled_data
        )[0][1]

        risk_percentage = round(
            probability * 100,
            2
        )

        # =================================================
        # RESULT + TIPS
        # =================================================

        if prediction == 1:

            result = "High Diabetes Risk"

            tips = [

                "Reduce sugar intake",

                "Exercise daily",

                "Maintain healthy weight",

                "Monitor glucose levels",

                "Drink more water"

            ]

        else:

            result = "Low Diabetes Risk"

            tips = [

                "Maintain balanced diet",

                "Stay physically active",

                "Avoid excessive sugar",

                "Healthy lifestyle",

                "Regular checkups"

            ]

        return {

            "Prediction": result,

            "RiskPercentage": risk_percentage,

            "Tips": tips

        }

    except Exception as e:

        return {

            "error": str(e)

        }

# =========================================================
# MENTAL HEALTH PREDICTION
# =========================================================

@app.post("/predict/mental")
def predict_mental(data: dict):

    try:

        diet_quality = mental_label_encoders[
            "diet_quality"
        ].transform([
            data["diet_quality"]
        ])[0]

        weather = mental_label_encoders[
            "weather"
        ].transform([
            data["weather"]
        ])[0]

        features = pd.DataFrame([{

            "sleep_hours":
            data["sleep_hours"],

            "screen_time":
            data["screen_time"],

            "exercise_minutes":
            data["exercise_minutes"],

            "daily_pending_tasks":
            data["daily_pending_tasks"],

            "interruptions":
            data["interruptions"],

            "fatigue_level":
            data["fatigue_level"],

            "social_hours":
            data["social_hours"],

            "coffee_cups":
            data["coffee_cups"],

            "diet_quality":
            diet_quality,

            "weather":
            weather,

            "mood_score":
            data["mood_score"]

        }])

        # =================================================
        # SCALE
        # =================================================

        scaled_data = mental_scaler.transform(
            features
        )

        # =================================================
        # PREDICT
        # =================================================

        prediction = mental_model.predict(
            scaled_data
        )[0]

        stress_level = round(
            float(prediction),
            2
        )

        # =================================================
        # CATEGORY
        # =================================================

        if stress_level <= 3:

            category = "Low Stress"

        elif stress_level <= 6:

            category = "Moderate Stress"

        else:

            category = "High Stress"

        stress_percentage = min(

            round(
                (stress_level / 10) * 100,
                2
            ),

            100

        )

        # =================================================
        # TIPS
        # =================================================

        tips = [

            "Sleep 7-8 hours daily",

            "Reduce screen time",

            "Practice meditation",

            "Exercise regularly",

            "Maintain social interaction"

        ]

        return {

            "Prediction": category,

            "StressLevel": stress_level,

            "StressPercentage":
            stress_percentage,

            "Tips": tips

        }

    except Exception as e:

        return {

            "error": str(e)

        }

# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(

        "app:app",

        host="127.0.0.1",

        port=8000,

        reload=True

    )