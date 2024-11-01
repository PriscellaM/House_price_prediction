// src/pages/PredictionPage.js

import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import { Container, Typography, Paper, Box, Button } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import PredictionForm from './PredictionForm'; // Import PredictionForm component for user input
import Result from './Result'; // Import Result component to display predictions
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary component for error handling
import { createBuildingAreaChartData, createTypesChartData } from './CreateChartData'; // Import functions to create chart data

// PredictionPage functional component
const PredictionPage = () => {
  // State variables for form inputs and prediction results
  const [type, setType] = useState(null); // Property type
  const [rooms, setRooms] = useState(''); // Number of rooms
  const [bathroom, setBathroom] = useState(''); // Number of bathrooms
  const [carspace, setCarspace] = useState(''); // Number of car spaces
  const [buildingArea, setBuildingArea] = useState(''); // Building area in square meters
  const [regionName, setRegionName] = useState(''); // Region name
  const [yearBuilt, setYearBuilt] = useState(''); // Year the property was built
  const [predictedPrice, setPredictedPrice] = useState(null); // Predicted price from the API
  const [error, setError] = useState(''); // Error message for predictions
  const [BAChartData, setBAChartData] = useState(null); // Chart data for building area predictions
  const [TChartData, setTChartData] = useState(null); // Chart data for property type predictions
  const [loading, setLoading] = useState(false); // Loading state for async operations

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Reset error message
    setPredictedPrice(null); // Reset predicted price
    setLoading(true); // Set loading state to true

    try {
      // Send POST request to the prediction API
      const response = await axios.post(`http://localhost:8000/predict/`, {
        type,
        rooms,
        bathroom,
        carspace,
        buildingArea,
        regionName,
        yearBuilt,
      });
      setPredictedPrice(response.data.predicted_price); // Set the predicted price from the response

      // Prepare data for Building Area Line Chart
      const buildingAreas = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300];
      const predsBA = await Promise.all(
        buildingAreas.map((ba) => // Fetch predicted prices for different building areas
          axios.get(`http://localhost:8000/predict/${type}/${rooms}/${bathroom}/${carspace}/${ba}/${regionName}/${yearBuilt}`).then((res) => res.data.predicted_price)
        )
      );
      // Create chart data for building area predictions
      const newBAChartData = createBuildingAreaChartData(buildingAreas, predsBA, buildingArea, response.data.predicted_price);
      setBAChartData(newBAChartData);

      // Prepare data for Property Type Bar Chart
      const types = [1, 2, 3]; // Define property types
      const predsT = await Promise.all(
        types.map((t) => // Fetch predicted prices for different property types
          axios.get(`http://localhost:8000/predict/${t}/${rooms}/${bathroom}/${carspace}/${buildingArea}/${regionName}/${yearBuilt}`).then((res) => res.data.predicted_price)
        )
      );
      // Create chart data for property type predictions
      const newTChartData = createTypesChartData(types, predsT, type, response.data.predicted_price);
      setTChartData(newTChartData);

    } catch (err) {
      // Handle any errors that occur during the API calls
      setError('Error predicting price, please try again!');
      console.error(err); // Log error to console
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container 
      maxWidth={{ xs: 'sm', md: 'md' }} 
      component="main" 
      sx={{ py: 4 }} // Vertical padding
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button 
          component={Link} 
          to="/" // Link to home page
          variant="contained" 
          color="secondary"
          size="small" 
          sx={{ marginRight: 'auto' }} // Align button to the left
        >
          Back to Home
        </Button>
      </Box>
      <Typography 
        variant={{ xs: 'h4', md: 'h3' }} 
        component="h1" 
        gutterBottom
        color='primary'
      >
        House Price Predictor
      </Typography>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 3 }, // Padding for Paper component
          mb: { xs: 2, md: 3 } // Margin bottom for spacing
        }} 
      >
        <PredictionForm
          type={type}
          setType={setType}
          rooms={rooms}
          setRooms={setRooms}
          bathroom={bathroom}
          setBathroom={setBathroom}
          carspace={carspace}
          setCarspace={setCarspace}
          buildingArea={buildingArea}
          setBuildingArea={setBuildingArea}
          regionName={regionName}
          setRegionName={setRegionName}
          yearBuilt={yearBuilt}
          setYearBuilt={setYearBuilt}
          handleSubmit={handleSubmit}
          loading={loading} // Pass loading state to form
        />
      </Paper>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}> {/* Display error message if exists */}
          {error}
        </Typography>
      )}
      {predictedPrice && (
        <ErrorBoundary> {/* Wrap the Result component in ErrorBoundary for error handling */}
          <Result predictedPrice={predictedPrice} BAChartData={BAChartData} TChartData={TChartData} />
        </ErrorBoundary>
      )}
    </Container>
  );  
};

export default PredictionPage; // Export the PredictionPage component for use in other parts of the app
