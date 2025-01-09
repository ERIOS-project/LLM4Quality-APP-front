import React, { memo } from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import VerbatimStatus from '../../../models/VerbatimStatus';
import { setSelectedStatus } from '../../../redux/statusSlice';

const StatusSelection = memo(() => {
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
    <FormControl fullWidth variant="outlined" sx={{ maxWidth: '300px', marginTop: '20px' }}>
      <InputLabel id="status-select-label" sx={{ color: '#2A3E53' }}>Statut</InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        value={selectedStatus}
        onChange={handleChange}
        label="Statut"
        sx={{
          backgroundColor: '#fff',
          borderRadius: '6px',
          borderColor: '#2A3E53', // Couleur pour la bordure (identique à l'AppBar)
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2A3E53', // Bordure par défaut
            },
            '&:hover fieldset': {
              borderColor: '#1f2c3a', // Bordure plus foncée au survol
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2A3E53', // Bordure quand le champ est en focus
            },
          },
        }}
      >
        <MenuItem value="">
          {getStatusLabel('')}
        </MenuItem>
        {Object.values(VerbatimStatus).map((status) => (
          <MenuItem key={status} value={status}>
            {getStatusLabel(status)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default StatusSelection;
