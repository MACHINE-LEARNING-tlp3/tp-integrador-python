from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

# cargar modelo y columnas al inicio
modelo = joblib.load("./train/modelo_logistico_cancer.pkl")
columnas = joblib.load("./train/columnas_usadas.pkl")


# definir el modelo de datos para la entrada
class Body(BaseModel):
    concave_points_worst: float
    perimeter_worst: float
    concave_points_mean: float
    radius_worst: float
    perimeter_mean: float
    area_worst: float
    radius_mean: float
    area_mean: float
    concavity_mean: float
    concavity_worst: float

def prediccion(data: Body) -> dict:
    # Crear el diccionario con nombres ya compatibles
    entrada_dict = {col: getattr(data, col) for col in columnas}

    # Convertir a DataFrame en el mismo orden que entrenamiento
    entrada_df = pd.DataFrame([entrada_dict], columns=columnas)

    # Realizar predicción
    pred = modelo.predict(entrada_df)[0]
    prob = modelo.predict_proba(entrada_df)[0][1]

    return {
        "diagnostico": "Maligno" if pred == 1 else "Benigno",
        "probabilidad": round(prob * 100, 2)
    }

