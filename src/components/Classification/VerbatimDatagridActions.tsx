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
import { useTheme, useMediaQuery } from '@mui/material';

export default function VerbatimDatagridActions() {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const theme = useTheme(); // Accéder au thème
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

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
      {/* YearSelection et StatusSelection toujours affichés de la même manière */}
      <Grid
        size={{ xs: 6, sm: 6, md: 3, lg: 1.5 , xl: 1.5}}
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
        size={{ xs: 6, sm: 6, md: 3, lg: 1.5 , xl: 1.5}}
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

      {isXl && (
        <>
          <Grid
            size={{xl: 3.5 }}
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
            size={{xl: 1.8 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            {selectedRows.length > 0 && (
              <div style={{ width: '100%' }}>
                <RelaunchClassification isMobile={false}/>
              </div>
            )}
          </Grid>

          <Grid
            size={{xl: 1.8 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            {selectedRows.length > 0 && (
              <div style={{ width: '100%' }}>
                <DeleteVerbatim isMobile={false}/>
              </div>
            )}
          </Grid>

          <Grid
            size={{lg: 1.8 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <div style={{ width: '100%' }}>
              <UploadCsv isMobile={false} />
            </div>
          </Grid>
        </>
      )}

      {isLg && (
        <>
          <Grid
            size={{lg: 3.5 }}
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
            size={{lg: 1.8 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            {selectedRows.length > 0 && (
              <div style={{ width: '100%' }}>
                <RelaunchClassification isMobile={false}/>
              </div>
            )}
          </Grid>

          <Grid
            size={{lg: 1.8 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            {selectedRows.length > 0 && (
              <div style={{ width: '100%' }}>
                <DeleteVerbatim isMobile={false}/>
              </div>
            )}
          </Grid>

          <Grid
            size={{lg: 1.8 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <div style={{ width: '100%' }}>
              <UploadCsv isMobile={false} />
            </div>
          </Grid>
        </>
      )}

      {isMd && (
        <>
          <Grid
            size={{ md:6 }}
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
            size={{md: selectedRows.length > 0 ? 4 : 12 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <div style={{ width: '100%' }}>
              <UploadCsv isMobile={false}/>
            </div>
          </Grid>
          {selectedRows.length > 0 && (
          <Grid
            size={{md: 4}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
              <div style={{ width: '100%' }}>
                <RelaunchClassification isMobile={false} />
              </div>
          </Grid>
          )}
          {selectedRows.length > 0 && (
          <Grid
            size={{md: 4}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
              <div style={{ width: '100%' }}>
                <DeleteVerbatim isMobile={false} />
              </div>
            
          </Grid>
          )}
        </>
      )}

      {isSm && (
        <>
          <Grid
            size={{sm: 12}}
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

          {selectedRows.length > 0 && (
          <Grid
            size={{sm: 4}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
              <div style={{ width: '100%' }}>
                <RelaunchClassification isMobile={false}/>
              </div>
          </Grid>
          )}
          {selectedRows.length > 0 && (
          <Grid
            size={{sm: 4}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
              <div style={{ width: '100%' }}>
                <DeleteVerbatim isMobile={false}/>
              </div>
            
          </Grid>
          )}
          <Grid
            size={{sm: 4}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <div style={{ width: '100%' }}>
              <UploadCsv isMobile={false}/>
            </div>
          </Grid>
        </>
      )}

      {isXs && (
        <>
          <Grid
            size={{ xs: 12}}
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
            size={{ xs: 4}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <div style={{ width: '100%' }}>
              <UploadCsv isMobile={true}/>
            </div>
          </Grid>
          {selectedRows.length > 0 && (
          <Grid
            size={{xs: 4}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
              <div style={{ width: '100%' }}>
                <RelaunchClassification isMobile={true}/>
              </div>
          </Grid>
          )}
          {selectedRows.length > 0 && (
          <Grid
            size={{xs: 4}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
              <div style={{ width: '100%' }}>
                <DeleteVerbatim isMobile={true}/>
              </div>
            
          </Grid>
          )}
        </>
      )}

    </Grid>
  );
}