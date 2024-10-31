// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
        }}
      >
        <Typography 
          variant="body2" 
          color="white" 
          sx={{ flexGrow: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }} // Responsive font size
        >
          Group 86 - Liban
        </Typography>
        <Typography 
          variant="body2" 
          color="white" 
          sx={{ flexGrow: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }} // Responsive font size
        >
          COS30049 Project - House Price Predictor
        </Typography>
        <Typography 
          variant="body2" 
          color="white" 
          sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }} // Responsive font size
        >
          {new Date().getFullYear()}
        </Typography>
      </Box>
    );
};

export default Footer;
