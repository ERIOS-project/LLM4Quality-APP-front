import React from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import VerbatimStatus from '../../../models/VerbatimStatus';
import { setSelectedStatus } from '../../../redux/statusSlice';

export default function StatusSelection() {
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
    <FormControl fullWidth variant="outlined">
      <InputLabel id="status-select-label">Statut</InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        value={selectedStatus}
        onChange={handleChange}
        label="Statut"
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
}