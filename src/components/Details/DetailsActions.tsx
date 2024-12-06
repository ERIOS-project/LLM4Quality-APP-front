import React from 'react';
import { Typography } from '@mui/material';
import Verbatim from '../../models/Verbatim';
import Grid from '@mui/material/Grid2';
import RelaunchVerbatimDetails from './Actions/RelaunchVerbatimDetails';
import DeleteVerbatimDetails from './Actions/DeleteVerbatimDetails';

interface DetailsActionsProps {
  verbatim: Verbatim;
}

export default function DetailsActions({ verbatim }: DetailsActionsProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{xs:6}}>
        <RelaunchVerbatimDetails verbatim = {verbatim}/>
      </Grid>
      <Grid size={{xs:6}}>
        <DeleteVerbatimDetails id = {verbatim.id} />
      </Grid>
    </Grid>
  );
}