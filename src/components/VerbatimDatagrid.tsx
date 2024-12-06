import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Verbatim from '../models/Verbatim';
import VerbatimStatus from '../models/VerbatimStatus';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { green, red, orange } from '@mui/material/colors';
import Button from '@mui/material/Button';

// Exemple de données de verbatims
const verbatims: Verbatim[] = [
  {
    id: '1',
    content: 'Verbatim 1',
    status: VerbatimStatus.Success,
    year: 2023,
    created_at: new Date('2023-01-01'),
    result: undefined,
  },
  {
    id: '2',
    content: 'Verbatim 2',
    status: VerbatimStatus.Error,
    year: 2022,
    created_at: new Date('2022-05-15'),
    result: undefined,
  },
];

// Définition des colonnes du DataGrid
const columns: GridColDef<(typeof verbatims)[number]>[] = [
    { 
        field: 'created_at',
        headerName: 'Date de Création',
        width: 200,
        flex:1, 
        valueGetter: (value,row) => row.created_at.toLocaleDateString() 
    },
    {
        field: 'year',
        headerName: 'Année',
        flex: 1,
        width: 100 
    },
    { 
        field: 'status', 
        headerName: 'Statut', 
        flex: 1,
        renderCell: (params) => {
            const getIcon = () => {
              switch (params.value) {
                case VerbatimStatus.Success:
                  return <CheckCircleIcon style={{ color: green[500] }} />;
                case VerbatimStatus.Error:
                  return <CancelIcon style={{ color: red[500] }} />;
                case VerbatimStatus.Run:
                  return <HourglassTopIcon style={{ color: orange[500] }} />;
                default:
                  return null;
              }
            };
          
            return (
              <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                {getIcon()}
              </div>
            );
          },
      },
      { 
        field: 'actions', 
        headerName: '', 
        flex: 1,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log(`Action on row ${params.row.id}`)}
          >
            Détails
          </Button>
        )
      }
];

export default function VerbatimDatagrid() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid size={{xs: 12 , sm:10, md:10, lg:10 }}>
        <Paper style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={verbatims}
            columns={columns}
            pagination
            checkboxSelection
            pageSizeOptions={[5]}
            getRowId={(row) => row.id}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}