import React, { memo } from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setSelectedYear } from '../../../redux/yearSlice';
import { Box } from '@mui/system';
import { useThemeContext } from "../../../components/ThemeContextProvider";  // Importation du useThemeContext
import { useTheme

 } from '@mui/material';
const YEAR_LIMIT = 2000; // Année limite inférieure
const CURRENT_YEAR = new Date().getFullYear(); // Année actuelle (2024)

const YearSelection = memo(() => {
  const dispatch = useDispatch();
  const selectedYear = useSelector((state: RootState) => state.year.selectedYear);
  const theme = useTheme(); // Utilisation du hook useTheme

  // Utilisation du ThemeContext
  const { darkMode } = useThemeContext();

  // Générer la liste des années entre l'année limite et l'année actuelle
  const years = Array.from({ length: CURRENT_YEAR - YEAR_LIMIT + 1 }, (_, i) => CURRENT_YEAR - i);

  const handleChange = (event: SelectChangeEvent<number | ''>) => {
    const year = event.target.value as number | '';
    dispatch(setSelectedYear(year));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <FormControl fullWidth variant="outlined" sx={{ maxWidth: '300px', marginTop: '20px' }}>
        <InputLabel id="year-select-label" sx={{ color: darkMode ? '#fff' : '#000' }}>Année</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={selectedYear}
          onChange={handleChange}
          label="Année"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // Limite la hauteur du menu
                overflowY: 'auto', // Ajoute un défilement vertical si nécessaire
              },
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
          sx={{
            backgroundColor: darkMode ? '#333' : '#fff', // Fond dynamique
            borderRadius: '6px',
            borderColor: darkMode ? '#444' : '#2A3E53', // Bordure dynamique
            color: darkMode ? '#fff' : '#000', // Couleur du texte dynamique
            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.text.secondary // <------------------ utline-color on hover
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? '#444' : '#2A3E53', // Bordure par défaut
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#666' : '#1f2c3a', // Bordure au survol
              },
              '&.Mui-focused fieldset': {
                borderColor: darkMode ? '#888' : '#2A3E53', // Bordure au focus
              },
            },
            '& .MuiMenuItem-root': {
              color: darkMode ? '#fff' : '#000', // Couleur du texte des éléments du menu
            },
          }}
        >
          <MenuItem value="" sx={{ color: darkMode ? '#fff' : '#000' }}>
            Toutes les années
          </MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year} sx={{ color: darkMode ? '#fff' : '#000' }}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});

export default YearSelection;