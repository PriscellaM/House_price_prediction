#House Price Prediction Model
#Group 86 - Liban

#Import Libraries
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
import joblib

#Random Forest Regression Model
class RFRegModel:
    def __init__(self):
        # Initialize the model (random forest regression model)
        #Using the best parameters found from assignment2
        self.model = RandomForestRegressor(n_estimators=300,min_samples_split=2, min_samples_leaf=1, max_features='sqrt', max_depth=30)

    def train(self):
        #Load the melbourne housing training dataset
        df = pd.read_csv('processed_melbourne_housing.csv')

        #Separate Features(X) and Price(y)
        #Features: 'Type', 'Rooms', 'Bathroom', 'Car','BuildingArea', 'Regionname', 'YearBuilt'
        X = df.drop(columns=['Price'])  # Remove the house price column and keep the features
        y = df['Price']  # Take the house price as the target value

        #Scale Training Data
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        #TRAIN
        #Train the model
        self.model.fit(X_scaled, y)

        #Save the model
        joblib.dump(self.model, 'RFRegModel.pkl')

        #Evaluation
        predictions = self.model.predict(X_scaled)
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
    model.train()
