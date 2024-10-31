#House Price Prediction Model
#Group 86 - Liban

#Import Libraries
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
import joblib
import json
import os

#Random Forest Regression Model
class RFRegModel:
    def __init__(self):
        # Initialize the model (random forest regression model)
        #Using the best parameters found from assignment2
        self.model = RandomForestRegressor(n_estimators=300,min_samples_split=2, min_samples_leaf=1, max_features='sqrt', max_depth=30)
    
    def prepareDataForPieChart(self):   
        #Load the melbourne housing training dataset
        data = pd.read_csv('processed_melbourne_housing.csv')

        #Calculate the counts of each type
        type_counts = data['Type'].value_counts()

        #Create a mapping for Type values
        type_mapping = {1: 'Unit', 2: 'House', 3: 'Townhouse'}

        #Replace Type values with their corresponding names
        type_counts.index = type_counts.index.map(type_mapping)

        #Calculate the percentage of each type
        total_count = len(data)
        type_percentage = (type_counts / total_count * 100).reset_index()
        type_percentage.columns = ['Type', 'Percentage']

        #Convert to JSON format
        json_data = type_percentage.to_json(orient='records')

        #Define the path to save the JSON file
        output_path = '../frontend/public/type_percentage.json'

        #Create the directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        #Save JSON data to a file
        with open(output_path, 'w') as json_file:
            json.dump(json.loads(json_data), json_file, indent=4)

        #Print confirmation message
        print(f"JSON data saved to '{output_path}'")

    def train(self):
        #Load the melbourne housing training dataset
        df = pd.read_csv('processed_melbourne_housing.csv')

        #Separate Features(X) and Price(y)
        #Features: 'Type', 'Rooms', 'Bathroom', 'Car','BuildingArea', 'Regionname', 'YearBuilt'
        X = df.drop(columns=['Price'])  #Remove the house price column and keep the features
        y = df['Price']  #Take the house price as the target variable

        #TRAIN
        #Train the model
        self.model.fit(X, y)

        #Save the model
        joblib.dump(self.model, 'RFRegModel.pkl')

        #Evaluation
        predictions = self.model.predict(X)
        mse = mean_squared_error(y, predictions)
        r2 = r2_score(y, predictions)
        print(f'Model trained. MSE: {mse:.2f}, R²: {r2:.2f}')

    def predict(self, type, rooms, bathroom, carspace, buildingArea, regionName, yearBuilt):
        #Load the model
        model = joblib.load('RFRegModel.pkl')

        #Make prediction based on input
        return model.predict([[type, rooms, bathroom, carspace, buildingArea, regionName, yearBuilt]])

#For initial training
if __name__ == "__main__":
    model = RFRegModel()
    model.prepareDataForPieChart()
    model.train()
