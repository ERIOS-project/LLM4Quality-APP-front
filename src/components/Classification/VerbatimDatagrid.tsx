import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import VerbatimStatus from '../../models/VerbatimStatus';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { green, red, orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { setSelectedRows } from '../../app/selectedRowsSlice';
import Verbatim from '../../models/Verbatim';
import { fetchVerbatims } from '../../api/verbatims';

export default function VerbatimDatagrid() {
  const { data: verbatims = [], isLoading, error } = useQuery<Verbatim[]>('verbatims', fetchVerbatims);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectionChange = (selection: GridRowId[]) => {
    const selectedVerbatims = verbatims.filter((verbatim) => selection.includes(verbatim._id));
    dispatch(setSelectedRows(selectedVerbatims));
  };

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date de Création',
      width: 200,
      flex: 1,
      valueGetter: (value,row) => {
        const date = row.created_at;
        return date ? new Date(date).toLocaleDateString() : 'Date non disponible';
      },
    },
    {
      field: 'year',
      headerName: 'Année',
      flex: 1,
      width: 100,
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
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
          onClick={() => navigate(`/details/${params.row.id}`)}
          sx={{ textTransform: 'none' }}
        >
          Détails
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid size={{ xs: 12, sm: 10, md: 10, lg: 10 }}>
        <Paper style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={verbatims}
            columns={columns}
            pagination
            checkboxSelection
            pageSizeOptions={[5]}
            getRowId={(row) => row._id}
            onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as GridRowId[])}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}