// src/components/Header.js

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant={{ xs: 'h4', md: 'h3' }} component="h1" sx={{ mb: 2 }}>
            House Price Predictor
          </Typography>

          {/* Hamburger Icon */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              mb: 1,
            }}
            onClick={handleMenuToggle} // Toggle menu on click
          >
            <Box sx={{ width: '24px', height: '2px', backgroundColor: 'white', mb: '4px' }} />
            <Box sx={{ width: '24px', height: '2px', backgroundColor: 'white', mb: '4px' }} />
            <Box sx={{ width: '24px', height: '2px', backgroundColor: 'white' }} />
          </Box>

          {/* Expandable Menu */}
          {menuOpen && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Button component={Link} to="/" color="inherit" sx={{ mr: 2 }}>
                Home
              </Button>
              <Button component={Link} to="/about-dataset" color="inherit" sx={{ mr: 2 }}>
                About Dataset
              </Button>
              <Button component={Link} to="/predict" color="inherit">
                Predict Price
              </Button>
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
