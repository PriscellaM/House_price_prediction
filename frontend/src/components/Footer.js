// src/components/Footer.js

import React from 'react'; // Import React library
import { Box, Typography } from '@mui/material'; // Import MUI components

// Footer component that displays the footer content
const Footer = () => {
    return (
      <Box 
        sx={{ 
          bgcolor: 'primary.main', // Set background color from theme
          p: 2, // Padding for the footer
          display: 'flex', // Use flexbox for layout
          justifyContent: 'space-between', // Space items evenly with space between
          alignItems: 'center', // Center align items vertically
        }}
      >
        {/* Group name display */}
        <Typography 
          variant="body2" // Typography variant
          color="white" // Text color
          sx={{ flexGrow: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }} // Responsive font size
        >
          Group 86 - Liban
        </Typography>
        
        {/* Project description display */}
        <Typography 
          variant="body2" // Typography variant
          color="white" // Text color
          sx={{ flexGrow: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }} // Responsive font size
        >
          COS30049 Project - House Price Predictor
        </Typography>
        
        {/* Current year display */}
        <Typography 
          variant="body2" // Typography variant
          color="white" // Text color
          sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }} // Responsive font size
        >
          {new Date().getFullYear()} {/* Display the current year */}
        </Typography>
      </Box>
    );
};

export default Footer; // Export the Footer component for use in other parts of the app
