// src/components/Result.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import PriceVsBuildingAreaChart from './PriceVsBuildingAreaChart';
import PriceVsTypesChart from './PriceVsTypesChart';

const Result = ({ predictedPrice, BAChartData, TChartData }) => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true); // Show the result after a delay
    }, 4000); // Adjust delay time as needed

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth:{xs: '300px', sm: '655px', md: '700px'} }}>
      {showResult && (
        <>
          <Typography color="#fc6601" variant="h5" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem' } }}> 
            Predicted Price: ${predictedPrice.toLocaleString()}
          </Typography>
          <Box sx={{ mt: 3, width: '100%', height: { xs: '350px', sm: '500px', md: '600px' } }}>
            <PriceVsBuildingAreaChart chartData={BAChartData} />
          </Box>
          <Box sx={{ mt: 5, width: '100%', height: { xs: '350px', sm: '600px', md: '600px' } }}>
            <PriceVsTypesChart chartData={TChartData} /> {/* Add the PriceVsTypesChart here */}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Result;
