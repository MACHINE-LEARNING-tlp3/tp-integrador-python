from fastapi import APIRouter
from func.func import prediccion, Body

router = APIRouter()

@router.post("/prediccion")
def router_predict(data: Body):
  return prediccion(data)