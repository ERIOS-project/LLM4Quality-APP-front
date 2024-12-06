import React from 'react';
import Verbatim from '../../models/Verbatim';
import Grid from '@mui/material/Grid2';
import RelaunchVerbatimDetails from './Actions/RelaunchVerbatimDetails';
import DeleteVerbatimDetails from './Actions/DeleteVerbatimDetails';

interface DetailsActionsProps {
  verbatim: Verbatim;
}

export default function DetailsActions({ verbatim }: DetailsActionsProps) {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid size={{ xs: 10, sm: 10, md: 5, lg: 5, xl: 5 }}>
        <RelaunchVerbatimDetails verbatim={verbatim} />
      </Grid>
      <Grid size={{ xs: 10, sm: 10, md: 5, lg: 5, xl: 5 }}>
        <DeleteVerbatimDetails id={verbatim.id} />
      </Grid>
    </Grid>
  );
}