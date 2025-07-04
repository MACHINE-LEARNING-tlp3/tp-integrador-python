from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import router

app = FastAPI()

# permite las peticiones de otros dominios
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(router)