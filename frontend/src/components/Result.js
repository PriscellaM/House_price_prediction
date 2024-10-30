// src/components/Result.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';

const Result = ({ predictedPrice, chartData }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Predicted Price: ${predictedPrice.toLocaleString()}
      </Typography>
      {chartData && (
        <Box sx={{ mt: 3 }}>
          <Line 
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Price Predictions by Building Area'
                }
              },
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: {
                    display: true,
                    text: 'Building Area (sq m)'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Predicted Price ($)'
                  }
                }
              }
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default Result;
