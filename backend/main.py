from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, conint, confloat, ValidationError
from typing import Literal
from model import RFRegModel
from utils import logger

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

#GET endpoint for prediction
@app.get("/predict/{type}/{rooms}/{bathroom}/{carspace}/{buildingArea}/{regionName}/{yearBuilt}")
async def predict_price(type: int, rooms: int, bathroom: int, carspace: int, buildingArea: float, regionName: int, yearBuilt: int):
    #Type, where: Unit - 1, House - 2, Townhouse - 3
    #RegionName, #Where, Western Victoria - 1, Northern Victoria - 2, Eastern Victoria - 3, Western Metropolitan - 4, Northern Metropolitan - 5, South-Eastern Metropolitan - 6 , Eastern Metropolitan - 7, Southern Metropolitan - 8
    price = int(model.predict(type, rooms, bathroom, carspace, buildingArea, regionName, yearBuilt)[0])
    return {"predicted_price": price}

#POST endpoint for prediction
@app.post("/predict/")
async def predict_price(input: prediction_input):
    try:
        #Call the machine learming model predict function to get the predicted price
        price = int(model.predict(input.type, input.rooms, input.bathroom, input.carspace, input.buildingArea, input.regionName, input.yearBuilt)[0])
        
        #Log the prediction details(price, type, rooms, bathroom, carspace, buildingArea, regionName, and yearBuilt)
        logger.info(f"Prediction made: {price} for {input.type} type, {input.bedrooms} rooms, {input.bathroom} bathrooms, {input.carspace} carspace, {input.buildingArea} sq m, {input.regionName} region, {input.bedrooms} yearBuilt")

        #return the predicted price in a dict (JSON response)
        return {"predicted_price": price}
    except Exception as e:
        #Log the error if exception occurs during prediction
        logger.error(f'Error during prediction: {str(e)}')

        #Raise HTTP 500 internal server error if prediction failed
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
