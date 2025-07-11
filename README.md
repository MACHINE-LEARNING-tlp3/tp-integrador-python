﻿# Predicción de diagnóstico de Cáncer de Mama con Machine Learning

Para este trabajo integrador seleccionamos el caso de predicción de cáncer de mama utilizando el Breast Cancer Wisconsin Dataset (publicado por la UCI Machine Learning Repository). Se trata de un problema de clasificación binaria donde, a partir de ciertas características derivadas de imágenes de masas mamarias (como radio, textura, concavidad, etc.), se intenta predeci si una muestrs es maligna o benigna.

Dataset: [Breast Cancer Wisconsin](https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data)


## ¿Por qué este caso?

Elegimos este caso porque:

- Tiene aplicación real directa en el ámbito médico, donde la detección temprana del cáncer puede salvar vidas.
- Usa un dataser público, accesible y bien documentado, con más de 500 registros. (569 instancias).
- Las variables predictoras son todas numéricas, lo que facilita el entrenamiento de modelos supervisados.
- Permite aplicar técnicas de regresión logística y análisis de precisión.
- Es un excelente ejemplo de cómo la IA puede apoyar la detección temprana.
- El modelo genera predicciones interpretables, que se pueden mostrar como porcentaje de riesgo.

---

## Objetivo del Proyecto

Este proyecto tiene como objetivo integrar un modelo de Machine Learning entrenado sobre datos clínicos reales para predecir la probabilidad de diagnóstico de cáncer de mama. A través de una API funcional en Python (FastAPI) y una interfaz amigable en React, buscamos simular una herramienta de apoyo para profesionales de la salud que permita ingresar parámetros clínicos derivados de biopsias o mamografías, y obtener una predicción automática de riesgo.

Esta herramienta no reemplaza el juicio clínico profesional, pero sí demuestra cómo tecnologías como el aprendizaje automático pueden complementar procesos de diagnóstico y evaluación médica.

---

## Tecnologías utilizadas

| Backend               | Frontend     |
| --------------------- | ------------ |
| Python 3.12 + FastAPI | Vite + React |
| Joblib                | TailwindCSS  |

---

## Estructura del proyecto

```
TP-INTEGRADOR-PYTHON/
│
├── frontend/              # Cliente web (React + Vite)
│   ├── src/
    |   ├──componentes
    |   ├──pages           # Página principal
│   ├── public/
│   └── index.html
│
├── backend/              # Backend con FastAPI
│   ├── main.py
│   ├── func/              # Función de predicción
│   ├── routes/            # Rutas de la API
│   ├── train/             # Entrenamiento y modelo guardado
│   └── requirements.txt
│
└── README.md              # Documentación del proyecto
```

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/MACHINE-LEARNING-tlp3/tp-integrador-python.git
cd tp-integrador-python
```

### 2. Backend (FastAPI)

```bash
python -m venv env
env\Scripts\activate   # o source env/bin/activate en Linux/macOS
pip install -r requirements.txt
cd backend
uvicorn main:app --reload
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## Endpoints disponibles

| Método | Ruta          | Descripción                   |
| ------ | ------------- | ----------------------------- |
| POST   | `/prediccion` | Devuelve diagnóstico y riesgo |

**Ejemplo de entrada:**

```json
{
  "concave_points_worst": 0.2,
  "perimeter_worst": 130,
  "concave_points_mean": 0.1,
  "radius_worst": 17,
  "perimeter_mean": 90,
  "area_worst": 800,
  "radius_mean": 14,
  "area_mean": 600,
  "concavity_mean": 0.15,
  "concavity_worst": 0.25
}
```

**Respuesta esperada:**

```json
{
  "diagnostico": "Maligno",
  "probabilidad": 86.43
}
```

---

## Créditos

Proyecto realizado por [Tatiana Medina](https://github.com/tatymediina) y [Ailín Miño](https://github.com/ayelenailin-m) para la materia **Taller de Lenguaje de Programación 3 - Python para Ciencia de datos**, 2025.

---
