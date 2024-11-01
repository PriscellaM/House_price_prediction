// src/App.js

import { Container, Box } from '@mui/material'; // Import MUI components
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import theme provider for custom theming
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router for navigation
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import HomePage from './components/HomePage'; // Import HomePage component
import AboutDataset from './components/AboutDataset'; // Import AboutDataset component
import PredictionPage from './components/PredictionPage'; // Import PredictionPage component
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // Import Chart.js components
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary component

// Registering Chart.js components for use in the application
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Create a custom theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: '#44195e',  // Purple color for primary theme
    },
    secondary: {
      main: '#ef955d',  // Light brown color for secondary theme
    },
    background: {
      default: '#f8f8f7', // Off-white background color
    },
  },
});

// Main App component
function App() {
  return (
    <ThemeProvider theme={theme}> {/* Apply the custom theme to the app */}
      <Router> {/* Set up routing for the application */}
        <Box 
          sx={{ 
            display: 'flex', // Use flexbox for layout
            flexDirection: 'column', // Arrange children in a column
            minHeight: '100vh', // Ensure the container takes at least the full viewport height
            backgroundColor: 'background.default', // Set background color from theme
          }}
        >
          <ErrorBoundary> {/* Wrap the content in ErrorBoundary */}
            <Header /> {/* Render the Header component */}
            <Container maxWidth="md" component="main" sx={{ flex: 1, py: 4 }}> {/* Main content area */}
              <Routes> {/* Define application routes */}
                <Route path="/" element={<HomePage />} /> {/* Home route */}
                <Route path="/about-dataset" element={<AboutDataset />} /> {/* About Dataset route */}
                <Route path="/predict" element={<PredictionPage />} /> {/* Prediction Page route */}
              </Routes>
            </Container>
            <Footer /> {/* Render the Footer component */}
          </ErrorBoundary>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; // Export the App component for use in index.js
