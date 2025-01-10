import React, { memo } from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setSelectedYear } from '../../../redux/yearSlice';
import { Box } from '@mui/system';

const YEAR_LIMIT = 2000; // Année limite inférieure
const CURRENT_YEAR = new Date().getFullYear(); // Année actuelle (2024)

const YearSelection = memo(() => {
  const dispatch = useDispatch();
  const selectedYear = useSelector((state: RootState) => state.year.selectedYear);

  // Générer la liste des années entre l'année limite et l'année actuelle
  const years = Array.from({ length: CURRENT_YEAR - YEAR_LIMIT + 1 }, (_, i) => CURRENT_YEAR - i);

  const handleChange = (event: SelectChangeEvent<number | ''>) => {
    const year = event.target.value as number | '';
    dispatch(setSelectedYear(year));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <FormControl fullWidth variant="outlined" sx={{ maxWidth: '300px', marginTop: '20px' }}>
        <InputLabel id="year-select-label" sx={{ color: '#2A3E53' }}>Année</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={selectedYear}
          onChange={handleChange}
          label="Année"
          sx={{
            backgroundColor: '#fff',
            borderRadius: '6px',
            borderColor: '#2A3E53', // Couleur de la bordure en accord avec l'AppBar
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#2A3E53', // Bordure par défaut
              },
              '&:hover fieldset': {
                borderColor: '#1f2c3a', // Bordure plus foncée au survol
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2A3E53', // Bordure plus marquée lors du focus
              },
            },
          }}
        >
          <MenuItem value="">
            Toutes les années
          </MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});

export default YearSelection;