// src/components/AboutDataset.js
import React from 'react'; // Import React library
import { Container, Typography, Box, Button } from '@mui/material'; // Import MUI 
import { Link } from 'react-router-dom'; // Import Link for navigation
import TypePieChart from './TypePieChart'; // Import property types pie chart component
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary component

const AboutDataset = () => {   
  return (
    <Container>
      {/* Header for the dataset section */}
      <Typography variant={{ xs: 'h4', md: 'h3' }} component="h1" color="primary" gutterBottom sx={{ textAlign: 'center' }}>
        About the Dataset
      </Typography>
      
      {/* Description of the dataset */}
      <Typography variant="body1" color="#101010" sx={{ mt: 4, mb: 4, textAlign: 'justify', fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
        We have curated a comprehensive dataset of 5,451 property listings, featuring a diverse distribution of property types: 61.3% townhouses, 27.6% units, and 11.2% houses. This dataset includes essential features such as property type, number of rooms, bathrooms, car space, building area, region, and year built, enabling us to develop an AI model for predicting house prices. With its substantial sample size and rich feature set, this dataset serves as a valuable resource to create the House Price Predictor.
      </Typography>
      
      {/* Informational text about the pie chart */}
      <Typography variant="body1" color="#fc6601" sx={{ mb: 2, textAlign: 'justify', fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1.1rem' }}}>
        This pie chart represents the distribution of different property types in the dataset used to predict price.
      </Typography>
      
      {/* Container for the pie chart wrapped in ErrorBoundary */}
      <Box sx={{ mt: 3, width: '100%', height: 'auto', alignItems: 'center' }}>
        <ErrorBoundary>
          <TypePieChart /> {/* Render the pie chart component */}
        </ErrorBoundary>
      </Box>
      
      {/* Navigation buttons */}
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

export default AboutDataset; // Export the component for use in other parts of the app
