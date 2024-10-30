// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PredictionForm from './components/PredictionForm';
import Result from './components/Result';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

//Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [type, setType] = useState('');
  const [rooms, setRooms] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [carspace, setCarspace] = useState('');
  const [buildingArea, setBuildingArea] = useState('');
  const [regionName, setRegionName] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setpredictedPrice(null);
    setLoading(true);
    
    try {
      //Axios call to predict house price based on rooms, buildingArea, type, yearBuilt, bathroom, and carspace
      const response = await axios.get(`http://localhost:8000/predict/${type}/${rooms}/${bathroom}/${carspace}/${buildingArea}/${regionName}/${yearBuilt}`);
      setpredictedPrice(response.data.predicted_price);

      //Prepare data for the chart
      const Rooms = [2, 3, 4, 5, 6];
      const predictions = await Promise.all(
        Rooms.map(rooms => 
          axios.get(`http://localhost:8000/predict/${type}/${rooms}/${bathroom}/${carspace}/${buildingArea}/${regionName}/${yearBuilt}`)
            .then(res => res.data.predicted_price)
        )
      );
    
      //Creating the chart data using the predictions from the backend
      const newChartData = {
        labels: rooms, // X-axis labels (rooms)
        datasets: [
          {
            label: 'Predicted Price',
            data: predictions,  // Y-axis data (predicted prices)
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1
          },
          {
            label: 'Your Prediction',
            data: [{x: parseInt(rooms), y: response.data.predicted_price}],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 8,
            pointHoverRadius: 12,
            showLine: false //Show only the point for the user's prediction
          }
        ]
      };
      setChartData(newChartData);  //Set the chart data in state
    } catch (err) {
      setError('Error predicting price, please try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            House Price Predictor
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <PredictionForm 
              type={type} 
              setType={setType}
              rooms={rooms} 
              setRooms={setRooms}
              bathroom={bathroom} 
              setBathroom={setBathroom}
              carspace={carspace}
              setCarspace={setCarspace}
              buildingArea={buildingArea}
              setBuildingArea={setBuildingArea}
              regionName={regionName}
              setRegionName={setRegionName}
              yearBuilt={yearBuilt}
              setYearBuilt={setYearBuilt}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </Paper>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {predictedPrice && (
            <Result predictedPrice={predictedPrice} chartData={chartData} />
          )
          }
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
