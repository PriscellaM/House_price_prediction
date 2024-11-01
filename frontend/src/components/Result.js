// src/components/Result.js
import React, { useEffect, useState } from 'react';   //Import React library
import { Container, Typography, Box } from '@mui/material';   //Import MUI
import PriceVsBuildingAreaChart from './PriceVsBuildingAreaChart';  //Import Price vs Building Area Chart
import PriceVsTypesChart from './PriceVsTypesChart';  //Import Price vs Types Chart

// Result component receives predictedPrice, BAChartData, and TChartData as props
const Result = ({ predictedPrice, BAChartData, TChartData }) => {
  // State to manage the visibility of the result
  const [showResult, setShowResult] = useState(false);

  // useEffect hook to handle the timer for displaying the result
  useEffect(() => {
    // Set a timer to show the result after 4 seconds
    const timer = setTimeout(() => {
      setShowResult(true); // Update state to show the result
    }, 4000); //Adjust delay time to 4s

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    // Main container for the result, styled using Material-UI Container component
    <Container sx={{ p: 3, width: '100%', maxWidth: { xs: '500px', sm: '700px', md: '800px' } }}>
      {/* Conditional rendering to display loading message or the result */}
      {!showResult ? ( //Show loading message while waiting for the result
        <Typography color="secondary" variant="h6" align="center">
          Loading Result...
        </Typography>
      ) : (
        <>
          {/* Display predicted price if results are ready */}
          <Typography color="#fc6601" variant="h5" gutterBottom sx={{ mb:5, fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem' } }}> 
            Predicted Price: ${predictedPrice.toLocaleString()} {/* Format price with commas */}
          </Typography>
          
          {/* Data Visualization */}
          <Typography color="primary" variant="h6" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem', md: '1.8rem' } }}> 
            Data Visualization
          </Typography>

          {/* Explanation of the Line Chart */}
          <Typography color="#101010" variant="body1" gutterBottom sx={{ textAlign: 'justify', fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}> 
            The line chart below shows you the predicted prices for different building areas alongside your inputted building area. This makes it easy to compare how your choice stacks up against other sizes of building area, with all other features kept the same. Use this chart to see how varying building areas can affect prices.
          </Typography>

          {/* Box for the Price vs Building Area line chart */}
          <Box sx={{ mt: 3, width: '100%', height: { xs: '350px', sm: '500px', md: '600px' } }}>
            <PriceVsBuildingAreaChart chartData={BAChartData} /> {/* Pass chart data as prop */}
          </Box>

          {/* Explanation of the bar Chart */}
          <Typography color="#101010" variant="body1" gutterBottom sx={{ mt:5, textAlign: 'justify', fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}> 
            The bar chart below compares predicted prices for different property types - Unit, House, and Townhouse - alongside the type you have selected. Your chosen property type is highlighted with an orange dot, making it easy to see how its price stacks up against the others. This visualization allows you to understand how property type influences pricing while keeping all other features the same. Use this chart to see how different property types affect prices.
          </Typography>

          {/* Box for the Price vs Types bar chart */}
          <Box sx={{ mt: 5, width: '100%', height: { xs: '350px', sm: '600px', md: '600px' } }}>
            <PriceVsTypesChart chartData={TChartData} /> {/* Pass chart data as prop */}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Result; // Export the Result component for use in other parts of the app
