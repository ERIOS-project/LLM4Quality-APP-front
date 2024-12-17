import React, { useState } from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import VerbatimStatus from '../../../models/VerbatimStatus';

export default function StatusSelection() {
  const [selectedStatus, setSelectedStatus] = useState<VerbatimStatus>(VerbatimStatus.Success);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value as VerbatimStatus); // Convertir en VerbatimStatus
  };

  const getStatusLabel = (status: VerbatimStatus) => {
    switch (status) {
      case VerbatimStatus.Success:
        return 'Succès';
      case VerbatimStatus.Error:
        return 'Erreur';
      case VerbatimStatus.Run:
        return 'En cours';
      default:
        return status;
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
        {Object.values(VerbatimStatus).map((status) => (
          <MenuItem key={status} value={status}>
            {getStatusLabel(status)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}