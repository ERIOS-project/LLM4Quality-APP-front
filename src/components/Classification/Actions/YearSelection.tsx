import React, { memo } from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setSelectedYear } from '../../../redux/yearSlice';

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
    <FormControl fullWidth variant="outlined">
      <InputLabel id="year-select-label">Année</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        value={selectedYear}
        onChange={handleChange}
        label="Année"
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
  );
});

export default YearSelection;
