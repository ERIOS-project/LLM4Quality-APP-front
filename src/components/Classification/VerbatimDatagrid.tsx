import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import VerbatimStatus from '../../models/VerbatimStatus';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { green, red, orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { setSelectedRows } from '../../app/selectedRowsSlice';
import Verbatim from '../../models/Verbatim';

export default function VerbatimDatagrid() {
  const verbatims = useSelector((state: RootState) => state.verbatims);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectionChange = (selection: GridRowId[]) => {
    const selectedVerbatims = verbatims.filter((verbatim) => selection.includes(verbatim.id));
    dispatch(setSelectedRows(selectedVerbatims));
  };

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date de Création',
      width: 200,
      flex: 1,
      valueGetter: (value,row) => row.created_at.toLocaleDateString(),
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
        >
          Détails
        </Button>
      ),
    },
  ];

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
            getRowId={(row) => row.id}
            onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as GridRowId[])}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}