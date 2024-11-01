// src/components/PredictionForm.js
import React from 'react';
import { TextField, FormControl, Select, MenuItem, InputLabel, InputAdornment, Button, Grid, CircularProgress, FormHelperText  } from '@mui/material';

const PredictionForm = ({ 
  type, setType, 
  rooms, setRooms, 
  bathroom, setBathroom, 
  carspace, setCarspace, 
  buildingArea, setBuildingArea, 
  regionName, setRegionName, 
  yearBuilt, setYearBuilt, 
  handleSubmit, loading 
}) => {
  
  // Function to handle numeric input validation
  const handleNumberInput = (setter) => (event) => {
    const value = event.target.value;
    
    //Allow only digits or empty input
    if (/^\d*$/.test(value) || value === '') {
      setter(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Property Type Selection */}
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
            <FormHelperText>Please select one.</FormHelperText> {/* Added helper text */}
          </FormControl>
        </Grid>

        {/* Number of Rooms Input */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Number of Rooms"
            variant="outlined"
            value={rooms}
            onInput={handleNumberInput(setRooms)}
            required
            helperText="Please enter numbers only."
          />
        </Grid>

        {/* Number of Bathrooms Input */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Number of Bathrooms"
            variant="outlined"
            value={bathroom}
            onInput={handleNumberInput(setBathroom)}
            required
            helperText="Please enter numbers only."
          />
        </Grid>

        {/* Number of Carspaces Input */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Number of Carspace"
            variant="outlined"
            value={carspace}
            onInput={handleNumberInput(setCarspace)}
            required
            helperText="Please enter numbers only."
          />
        </Grid>

        {/* Building Area Input */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Building Area"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">sq m</InputAdornment>,
            }}
            value={buildingArea}
            onInput={handleNumberInput(setBuildingArea)}
            required
            helperText="Please enter numbers only."
          />
        </Grid>

        {/* Region Selection */}
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
            <FormHelperText>Please select one.</FormHelperText> {/* Added helper text */}
          </FormControl>
        </Grid>

        {/* Year Built Input */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Year Built"
            variant="outlined"
            value={yearBuilt}
            onInput={handleNumberInput(setYearBuilt)}
            required
            helperText="Please enter numbers only."
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="secondary" 
            fullWidth
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={10} /> : 'Predict Price'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PredictionForm;
