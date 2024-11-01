// src/components/TypePieChart.js
// Using plotly to create pie chart

import React, { useEffect, useState } from 'react'; //Import react components
import Plot from 'react-plotly.js';   //Import plotly for the chart
import { Box, useTheme, useMediaQuery } from '@mui/material';   //Import MUI components

const TypePieChart = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetch('/type_percentage.json') // Fetch data from the public folder
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  // Determine the current screen size
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // Extra small devices
  const isSm = useMediaQuery(theme.breakpoints.down('md')); // Small devices

  // Set width and height based on screen size
  const plotWidth = isXs ? 300 : isSm ? 600 : 700; // Width for different screen sizes
  const plotHeight = isXs ? 350 : 500; // Height for different screen sizes

  // Prepare data for the pie chart
  const chartData = {
    values: data.map(item => item.Percentage),
    labels: data.map(item => item.Type),
    type: 'pie',
    textinfo: 'label+percent', // Show label and percentage in the pie slice
    hoverinfo: 'label+percent+value', //Tooltip showing label, percentage, and value on hover
    marker: {
      colors: ['#44195e', '#fc6601', '#bcbcbb'], //colors for pie chart: purple, orange, grey
    },
  };

  return (
    <Box 
        sx={{ 
            width: '100%', 
            maxWidth: plotWidth ,
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            margin: '0 auto', // Center the Box within its parent
        }}
    >
      <Plot
        data={[chartData]}
        layout={{
          title: '<b>Property Type Distribution</b>',
          height: plotHeight, // Adjust height for better visibility
          width: plotWidth, // Use full width of the container
          showlegend: true, //show legend
          hovermode: 'closest', //hovermode set to closest
          margin: { t: 40, b: 40, l: 40, r: 40 }, // Add margins for better spacing
        }}
        config={{ 
          responsive: true,  // Ensure responsiveness
          staticPlot: false, // Ensure interactivity is enabled
        }}
      />
    </Box>
  );
};

export default TypePieChart;
