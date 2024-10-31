// src/pages/HomePage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant={{ xs: 'h4', md: 'h3' }} component="h1" color="primary" sx={{ mb: 4 }} gutterBottom>
          Welcome to the Melbourne House Price Predictor
        </Typography>
        <Typography variant="body1" component="h2" color="#101010" gutterBottom>
          Predict the price based on Property Type, Number of Rooms and Bathrooms, Carspace, Building Area, Region, and Year Built.
        </Typography>
        <Button 
          component={Link} 
          to="/predict" 
          variant="contained" 
          color="secondary" 
          size="large"
          sx={{ mt: 2, mb: 3 }}
        >
          Start Predicting
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="body1" component="h2" color="#101010" gutterBottom>
          The Price Predictor is made using the Melbourne Housing Dataset
        </Typography>
        <Typography variant="body2" component="h2" color="#fc6601" gutterBottom>
          Click the button below to learn more about the dataset
        </Typography>
        <Button 
          component={Link} 
          to="/about-dataset"
          variant="contained" 
          color="secondary" 
          size="large"
          sx={{ mt: 2 }}
        >
          About the Dataset
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
