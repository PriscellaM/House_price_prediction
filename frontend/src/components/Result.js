// src/components/Result.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';

const Result = ({ predictedCategory, chartData }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Predicted Category: {predictedCategory.toLocaleString()}
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
                  text: 'Category Predictions by Number of Rooms'
                }
              },
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: {
                    display: true,
                    text: 'Number of Rooms'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Predicted Category'
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
