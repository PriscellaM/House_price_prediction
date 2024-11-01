// src/pages/HomePage.js
import React from 'react'; // Import React library
import { Container, Typography, Button, Box } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import ErrorBoundary from '../components/ErrorBoundary'; // Import ErrorBoundary for error handling

// HomePage functional component
const HomePage = () => {
  return (
    <ErrorBoundary> {/* Wrap the entire component in ErrorBoundary for error handling */}
      <Container maxWidth="lg"> {/* Container for layout with maximum width set to 'lg' */}
        <Box sx={{ textAlign: 'center', my: 4 }}> {/* Centered box for content with vertical margin */}
          <Typography 
            variant={{ xs: 'h4', md: 'h3' }} 
            component="h1" 
            color="primary" 
            sx={{ mb: 4 }} 
            gutterBottom
          >
            Welcome to the Melbourne House Price Predictor
          </Typography>
          <Typography 
            variant="body1" 
            component="h2" 
            color="#101010" 
            gutterBottom
          >
            Predict the price based on Property Type, Number of Rooms and Bathrooms, Carspace, Building Area, Region, and Year Built.
          </Typography>
          <Button 
            component={Link} 
            to="/predict" // Navigation to the Prediction Page
            variant="contained" 
            color="secondary" 
            size="large"
            sx={{ mt: 2, mb: 3 }} // Margin top and bottom for spacing
          >
            Start Predicting
          </Button>
        </Box>
        
        <Box sx={{ textAlign: 'center', my: 4 }}> {/* Another centered box for additional content */}
          <Typography 
            variant="body1" 
            component="h2" 
            color="#101010" 
            gutterBottom
          >
            The Price Predictor is made using the Melbourne Housing Dataset
          </Typography>
          <Typography 
            variant="body2" 
            component="h2" 
            color="#fc6601" 
            gutterBottom
          >
            Click the button below to learn more about the dataset
          </Typography>
          <Button 
            component={Link} 
            to="/about-dataset" // Navigation to the About Dataset Page
            variant="contained" 
            color="secondary" 
            size="large"
            sx={{ mt: 2 }} // Margin top for spacing
          >
            About the Dataset
          </Button>
        </Box>
      </Container>
    </ErrorBoundary>
  );
};

export default HomePage; // Export the HomePage component for use in other parts of the application
