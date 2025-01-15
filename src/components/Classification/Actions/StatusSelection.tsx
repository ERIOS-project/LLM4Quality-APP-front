import React, { memo } from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import VerbatimStatus from '../../../models/VerbatimStatus';
import { setSelectedStatus } from '../../../redux/statusSlice';
import { Box } from '@mui/system';
import { useThemeContext } from "../../../components/ThemeContextProvider"; // Importation de useThemeContext
import { useTheme

 } from '@mui/material';
const StatusSelection = memo(() => {
  const { darkMode } = useThemeContext(); // Utilisation du ThemeContext pour obtenir le mode
  const theme = useTheme(); // Utilisation du hook useTheme
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state: RootState) => state.status.selectedStatus);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const status = event.target.value as VerbatimStatus | '';
    dispatch(setSelectedStatus(status));
  };

  const getStatusLabel = (status: VerbatimStatus | '') => {
    switch (status) {
      case VerbatimStatus.Success:
        return 'Succès';
      case VerbatimStatus.Error:
        return 'Erreur';
      case VerbatimStatus.Run:
        return 'En cours';
      default:
        return 'Tous les statuts'; // Libellé pour l'option par défaut
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <FormControl fullWidth variant="outlined" sx={{ maxWidth: '300px', marginTop: '20px' }}>
        <InputLabel id="status-select-label" sx={{ color: darkMode ? '#fff' : '#000' }}>Statut</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={selectedStatus}
          onChange={handleChange}
          label="Statut"
          sx={{
            backgroundColor: darkMode ? '#333' : '#fff', // Couleur de fond dynamique en fonction du mode
            borderRadius: '6px',
            borderColor: darkMode ? '#444' : '#2A3E53', // Bordure ajustée selon le mode
            color: darkMode ? '#fff' : '#000', // Couleur du texte dynamique
            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.text.secondary // <------------------ utline-color on hover
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? '#444' : '#2A3E53', // Bordure par défaut
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#666' : '#1f2c3a', // Bordure plus foncée au survol
              },
              '&.Mui-focused fieldset': {
                borderColor: darkMode ? '#666' : '#2A3E53', // Bordure quand le champ est en focus
              },
            },
            '& .MuiMenuItem-root': {
              color: darkMode ? '#fff' : '#000', // Couleur du texte des éléments du menu
            },
          }}
        >
          <MenuItem value="" sx={{ color: darkMode ? '#fff' : '#000' }}>
            {getStatusLabel('')}
          </MenuItem>
          {Object.values(VerbatimStatus).map((status) => (
            <MenuItem key={status} value={status} sx={{ color: darkMode ? '#fff' : '#000' }}>
              {getStatusLabel(status)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});

export default StatusSelection;