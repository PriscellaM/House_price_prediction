// src/components/PredictionForm.js
import React from 'react';
import { TextField, FormControl, Select, MenuItem, InputLabel, InputAdornment, Button, Grid, CircularProgress } from '@mui/material';

const PredictionForm = ({ type, setType, rooms, setRooms, bathroom, setBathroom, carspace, setCarspace, buildingArea, setBuildingArea, regionName, setRegionName, yearBuilt, setYearBuilt, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Property Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Property Type"
              required
            >
              <MenuItem value={1}>Unit</MenuItem>
              <MenuItem value={2}>House</MenuItem>
              <MenuItem value={3}>Townhouse</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Number of Rooms"
            variant="outlined"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Number of Bathroom"
            variant="outlined"
            value={bathroom}
            onChange={(e) => setBathroom(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Number of Carspace"
            variant="outlined"
            value={carspace}
            onChange={(e) => setCarspace(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Building Area"
            variant="outlined"
            slotProps={{
                input: {
                  endAdornment: <InputAdornment position="start">sq m</InputAdornment>,
                },
            }}
            value={buildingArea}
            onChange={(e) => setBuildingArea(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Region</InputLabel>
            <Select
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
              label="Region Name"
              required
            >
              <MenuItem value={1}>Western Victoria</MenuItem>
              <MenuItem value={2}>Northern Victoria</MenuItem>
              <MenuItem value={3}>Eastern Victoria</MenuItem>
              <MenuItem value={4}>Western Metropolitan</MenuItem>
              <MenuItem value={5}>Northern Metropolitan</MenuItem>
              <MenuItem value={6}>South-Eastern Metropolitan</MenuItem>
              <MenuItem value={7}>Eastern Metropolitan</MenuItem>
              <MenuItem value={8}>Southern Metropolitan</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Year Built"
            variant="outlined"
            value={yearBuilt}
            onChange={(e) => setYearBuilt(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Predict Category'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PredictionForm;
