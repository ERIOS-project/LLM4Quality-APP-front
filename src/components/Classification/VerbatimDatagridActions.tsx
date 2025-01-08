import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';
import YearSelection from './Actions/YearSelection';
import StatusSelection from './Actions/StatusSelection';
import RelaunchClassification from './Actions/RelaunchClassification';
import DeleteVerbatim from './Actions/DeleteVerbatim';
import UploadCsv from './Actions/UploadCsv';
import { RootState } from '../../redux/store';

export default function VerbatimDatagridActions() {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <YearSelection />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <StatusSelection />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        {selectedRows.length > 0 && <RelaunchClassification />}
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        {selectedRows.length > 0 && <DeleteVerbatim />}
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <UploadCsv />
      </Grid>
    </Grid>
  );
}