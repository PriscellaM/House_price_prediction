import React, { useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer
import HomePage from './components/HomePage'; // Import HomePage
import AboutDataset from './components/AboutDataset'; // Import AboutDataset
import PredictionPage from './components/PredictionPage'; // Import PredictionPage
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const theme = createTheme({
  palette: {
    primary: {
      main: '#44195e',  //purple
    },
    secondary: {
      main: '#ef955d',  //light brown
    },
    background: {
      default: '#f8f8f7', //off white
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh', //Ensure the container takes at least the full viewport height
            backgroundColor: 'background.default', //Set background color
          }}
        >
          <Header />
          <Container maxWidth="md" component="main" sx={{ flex: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-dataset" element={<AboutDataset />} />
              <Route path="/predict" element={<PredictionPage />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
