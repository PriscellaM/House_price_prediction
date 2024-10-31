// src/components/PriceVsBuildingAreaChart.js
import React, { useRef } from 'react';
import {  Button, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom'; //Import zoom plugin

//Register the plugin with Chart.js
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin); // Register the zoom plugin

const PriceVsBuildingAreaChart = ({ chartData }) => {
  //Create a ref for the chart
  const chartRef = useRef(null);

  //Reset zoom
  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom(); // Reset the zoom
    }
  };

  return (
    <Box sx={{ 
      width: '100%', height: { xs: '300px', sm: '400px', md: '500px' } // xs: Adjust for smaller screens, sm: Height for small devices, md: Height for medium devices and up
     }}>
      {chartData && (
        <>
          <Line
            ref={chartRef}  //attach the ref to the Line component
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#010101', //Color for legend labels (black)
                  },
                },
                title: {
                  display: true,
                  text: 'Price Predictions by Building Area',
                  color: '#010101', //Title color (black)
                },
                zoom: {
                  pan: {
                    enabled: true,
                    mode: 'xy', //panning in both x and y directions
                  },
                  zoom: {
                    enabled: true,
                    mode: 'xy', //zooming in both x and y directions
                    wheel: {
                      enabled: true, //enable zooming with the mouse wheel
                    },
                    pinch: {
                      enabled: true, //enable zooming with pinch gestures
                    },
                  },
                }, //end of zoom
              },
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: {
                    display: true,
                    text: 'Building Area (sq m)',
                    color: '#010101', //x-axis title color (black)
                  },
                  ticks: {
                    color: '#010101', //y-axis ticks color (black)
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Predicted Price ($)',
                    color: '#010101', //y-axis title color (black)
                  },
                  ticks: {
                    color: '#010101', //y-axis ticks color (black)
                  },
                },
              },
            }}
          />
          <Button onClick={handleResetZoom} color='secondary' variant='contained' size='small' sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            Reset Zoom
          </Button>
        </>
      )}
    </Box>
  );
};

export default PriceVsBuildingAreaChart;
