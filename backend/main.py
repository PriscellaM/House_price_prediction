from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, conint, confloat, ValidationError
from typing import Literal
from model import RFRegModel

app = FastAPI()

#Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  #URL of React application
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

#Initialize model
model = RFRegModel()

#Prediction input model with validation
class prediction_input(BaseModel):
    rooms: conint(ge=0)         #Non-negative integer
    buildingArea: confloat(ge=0)  #Non-negative float
    type: Literal[1, 2, 3]      #Only allows integers 1, 2, or 3 for type, where: 1 - unit, 2 - house, 3 - townhouse
    yearBuilt: conint(gt=0)     #Non-negative integer greater than 0
    bathroom: conint(ge=0)      #Non-negative integer
    carspace: conint(ge=0)      #Non-negative integer
    regionName: Literal[1, 2, 3, 4, 5, 6, 7, 8]  #Where, Western Victoria - 1, Northern Victoria - 2, Eastern Victoria - 3, Western Metropolitan - 4, Northern Metropolitan - 5, South-Eastern Metropolitan - 6 , Eastern Metropolitan - 7, Southern Metropolitan - 8

@app.get("/")
async def root():
    return {"message": "Welcome to the Melbourne House Price Prediction API"}

@app.get("/predict/{type}/{rooms}/{bathroom}/{carspace}/{buildingArea}/{regionName}/{yearBuilt}")
async def predict_price(type: int, rooms: int, bathroom: int, carspace: int, buildingArea: float, regionName: int, yearBuilt: int):
    #Type, where: Unit - 1, House - 2, Townhouse - 3
    #RegionName, #Where, Western Victoria - 1, Northern Victoria - 2, Eastern Victoria - 3, Western Metropolitan - 4, Northern Metropolitan - 5, South-Eastern Metropolitan - 6 , Eastern Metropolitan - 7, Southern Metropolitan - 8
    price = int(model.predict(type, rooms, bathroom, carspace, buildingArea, regionName, yearBuilt)[0])
    return {"predicted_price": price}

# @app.post("/predict/")
# async def predict_category(input: prediction_input):
#     try:
#         price = int(model.predict(input.rooms, input.buildingArea, input.type, 
#                                       input.yearBuilt, input.bathroom, input.carspace)[0])
#         return {"predicted_category": price}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
