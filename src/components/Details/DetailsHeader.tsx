import React from 'react';
import { Typography } from '@mui/material';
import VerbatimStatus from '../../models/VerbatimStatus';
import Grid from '@mui/material/Grid2';

interface DetailsHeaderProps {
  date: Date;
  status: VerbatimStatus;
}

export default function DetailsHeader({ date, status }: DetailsHeaderProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{xs:4}}>
        <Typography>Retour arrière</Typography>
      </Grid>
      <Grid size={{xs:4}}>
        <Typography>Date: {date.toDateString()}</Typography>
      </Grid>
      <Grid size={{xs:4}}>
        <Typography>Status: {status}</Typography>
      </Grid>
    </Grid>
  );
}
