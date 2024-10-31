// src/components/AboutDataset.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import TypePieChart from './TypePieChart';

const AboutDataset = () => {   
  return (
    <Container >
      <Typography variant={{ xs: 'h4', md: 'h3' }} component="h1" color="primary" gutterBottom sx={{ textAlign: 'center' }}>
        About the Dataset
      </Typography>
      <Typography variant="body1" color="#101010" sx={{ mb: 4, textAlign: 'center' }}>
        This pie chart represents the distribution of different property types in the dataset used to predict price.
      </Typography>
      <Box sx={{ mt: 3, width: '100%', height: 'auto', alignItems: 'center' }}>
        <TypePieChart />
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          component={Link} 
          to="/" // Link to the homepage
          variant="contained" 
          color="secondary" 
          size="small"
          sx={{ flexGrow: 1, mr: 5 }} // Add margin for spacing
        >
          Back to Home
        </Button>
        <Button 
          component={Link} 
          to="/predict" // Link to the prediction page
          variant="contained" 
          color="secondary" 
          size="small"
          sx={{ flexGrow: 1, ml: 5 }} // Add margin for spacing
        >
          Predict Price
        </Button>
      </Box>
    </Container>
  );
};

export default AboutDataset;
