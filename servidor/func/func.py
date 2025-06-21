from pydantic import BaseModel
import joblib
import numpy as np

# Cargar modelo y columnas al inicio
modelo = joblib.load("./train/modelo_logistico_cancer.pkl.")
columnas = joblib.load("./train/columnas_utilizadas.pkl")

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
    entrada = np.array([[getattr(data, col) for col in columnas]])
    
    pred = modelo.predict(entrada)[0]
    prob = modelo.predict_proba(entrada)[0][1]

    return {
        "diagnostico": "Maligno" if pred == 1 else "Benigno",
        "probabilidad": round(prob * 100, 2)
    }
