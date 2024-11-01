// src/components/Header.js

import React, { useState } from 'react'; // Import React and useState hook
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material'; // Import MUI components
import { Link } from 'react-router-dom'; // Import Link for navigation

// Header component that displays the application header and navigation menu
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  // Function to toggle the visibility of the menu
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  return (
    <AppBar position="static"> {/* Fixed position AppBar for the header */}
      <Toolbar>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Application title */}
          <Typography variant={{ xs: 'h4', md: 'h3' }} component="h1" sx={{ mb: 2 }}>
            House Price Predictor
          </Typography>

          {/* Hamburger Icon for menu toggle */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column', // Stack the lines vertically
              alignItems: 'center',
              cursor: 'pointer', // Change cursor to pointer on hover
              mb: 1,
            }}
            onClick={handleMenuToggle} // Toggle menu on click
          >
            {/* Three lines of the hamburger icon */}
            <Box sx={{ width: '24px', height: '2px', backgroundColor: 'white', mb: '4px' }} />
            <Box sx={{ width: '24px', height: '2px', backgroundColor: 'white', mb: '4px' }} />
            <Box sx={{ width: '24px', height: '2px', backgroundColor: 'white' }} />
          </Box>

          {/* Expandable Menu */}
          {menuOpen && ( // Render the menu only if menuOpen is true
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Button component={Link} to="/" color="inherit" sx={{ mr: 2 }}> {/* Link to Home */}
                Home
              </Button>
              <Button component={Link} to="/about-dataset" color="inherit" sx={{ mr: 2 }}> {/* Link to About Dataset */}
                About Dataset
              </Button>
              <Button component={Link} to="/predict" color="inherit"> {/* Link to Predict Price */}
                Predict Price
              </Button>
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header; // Export the Header component for use in other parts of the app
