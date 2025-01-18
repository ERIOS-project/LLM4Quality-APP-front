import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';
import YearSelection from './Actions/YearSelection';
import StatusSelection from './Actions/StatusSelection';
import RelaunchClassification from './Actions/RelaunchClassification';
import DeleteVerbatim from './Actions/DeleteVerbatim';
import UploadCsv from './Actions/UploadCsv';
import CountVerbatim from './Actions/CountVerbatim';
import { RootState } from '../../redux/store';
import { useTheme } from '@mui/material';

export default function VerbatimDatagridActions() {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const theme = useTheme(); // Accéder au thème

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center" // Aligner toutes les Grid verticalement
      sx={{
        backgroundColor: theme.palette.background.default, // Couleur dynamique du fond
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      {/* Composants uniformisés */}
      <Grid
        size={{ xs: 12, sm: 6, md: 4, lg: 1.5 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', // Alignement vertical
          height: '100px', // Hauteur fixe uniforme
        }}
      >
        <div style={{ width: '100%' }}>
          <YearSelection />
        </div>
      </Grid>

      <Grid
        size={{ xs: 12, sm: 6, md: 4, lg: 1.5 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <div style={{ width: '100%' }}>
          <StatusSelection />
        </div>
      </Grid>

      <Grid
        size={{ xs: 12, sm: 12, md: 4, lg: 3.5 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <div style={{ width: '100%' }}>
          <CountVerbatim />
        </div>
      </Grid>

      <Grid
        size={{ xs: 12, sm: 6, md: 6, lg: 1.5 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        {selectedRows.length > 0 && (
          <div style={{ width: '100%' }}>
            <RelaunchClassification />
          </div>
        )}
      </Grid>

      <Grid
        size={{ xs: 12, sm: 6, md: 6, lg: 1.5 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        {selectedRows.length > 0 && (
          <div style={{ width: '100%' }}>
            <DeleteVerbatim />
          </div>
        )}
      </Grid>

      <Grid
        size={{ xs: 12, sm: 12, md: 12, lg: 1.5 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <div style={{ width: '100%' }}>
          <UploadCsv />
        </div>
      </Grid>
    </Grid>
  );
}
