import React, { useState } from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';

const YEAR_LIMIT = 2000; // Année limite inférieure
const CURRENT_YEAR = new Date().getFullYear(); // Année actuelle (2024)

export default function YearSelection() {
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);

  // Générer la liste des années entre l'année limite et l'année actuelle
  const years = Array.from({ length: CURRENT_YEAR - YEAR_LIMIT + 1 }, (_, i) => CURRENT_YEAR - i);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(Number(event.target.value)); // Convertir en nombre car la valeur est initialement une chaîne
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
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
