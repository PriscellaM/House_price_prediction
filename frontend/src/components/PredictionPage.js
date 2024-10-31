// src/pages/PredictionPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import PredictionForm from './PredictionForm';
import Result from './Result';
import { createBuildingAreaChartData, createTypesChartData  } from './CreateChartData';

const PredictionPage = () => {
  const [type, setType] = useState(1);
  const [rooms, setRooms] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [carspace, setCarspace] = useState('');
  const [buildingArea, setBuildingArea] = useState('');
  const [regionName, setRegionName] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState('');
  const [BAChartData, setBAChartData] = useState(null);
  const [TChartData, setTChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPredictedPrice(null);
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8000/predict/`, {   //using POST method
        type,
        rooms,
        bathroom,
        carspace,
        buildingArea,
        regionName,
        yearBuilt,
      });
      setPredictedPrice(response.data.predicted_price);

      //for Building Area Line Chart
      const buildingAreas = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300];
      const predsBA = await Promise.all(
        buildingAreas.map((ba) =>   //using GET method
          axios.get(`http://localhost:8000/predict/${type}/${rooms}/${bathroom}/${carspace}/${ba}/${regionName}/${yearBuilt}`).then((res) => res.data.predicted_price)
        )
      );
      const newBAChartData = createBuildingAreaChartData(buildingAreas, predsBA, buildingArea, response.data.predicted_price);
      setBAChartData(newBAChartData);

      //for Property Type Bar Chart
      const types = [1, 2, 3];
      const predsT = await Promise.all(
        types.map((t) =>   //using GET method
          axios.get(`http://localhost:8000/predict/${t}/${rooms}/${bathroom}/${carspace}/${buildingArea}/${regionName}/${yearBuilt}`).then((res) => res.data.predicted_price)
        )
      );
      const newTChartData = createTypesChartData(types, predsT, type, response.data.predicted_price);
      setTChartData(newTChartData);

    } catch (err) {
      setError('Error predicting price, please try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth={{ xs: 'sm', md: 'md' }} 
      component="main" 
      sx={{ py: 4 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="secondary"
          size="small" 
          sx={{ marginRight: 'auto' }} // Align to the left
        >
          Back to Home
        </Button>
      </Box>
      <Typography 
        variant={{ xs: 'h4', md: 'h3' }} 
        component="h1" 
        gutterBottom
        color='primary'
      >
        House Price Predictor
      </Typography>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 3 }, 
          mb: { xs: 2, md: 3 } 
        }} 
      >
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
        <Result predictedPrice={predictedPrice} BAChartData={BAChartData} TChartData={TChartData}/>
      )}
    </Container>
  );  
};

export default PredictionPage;
