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
    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ backgroundColor: '#F4F4F4', paddingTop: '20px' , paddingLeft:'20px', paddingRight:'20px'}}>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%' }}>
          <YearSelection />
        </div>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%' }}>
          <StatusSelection />
        </div>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
        {selectedRows.length > 0 && (
          <div style={{ width: '100%' }}>
            <RelaunchClassification />
          </div>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
        {selectedRows.length > 0 && (
          <div style={{ width: '100%' }}>
            <DeleteVerbatim />
          </div>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%' }}>
          <UploadCsv />
        </div>
      </Grid>
    </Grid>
  );
}
