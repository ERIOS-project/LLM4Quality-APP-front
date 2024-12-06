import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ClassificationResult from '../../models/ClassificationResult';

interface DetailsTablesProps {
    result?: ClassificationResult;
}

export default function DetailsTables({result}: DetailsTablesProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{xs:12}}>
        <Typography variant="h1">DetailsTables</Typography>
      </Grid>
    </Grid>
  );
}