import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import VerbatimStatus from '../../models/VerbatimStatus';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { green, red, orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { setSelectedRows } from '../../redux/selectedRowsSlice';
import Verbatim from '../../models/Verbatim';
import { fetchVerbatims } from '../../api/verbatims';
import { RootState } from '../../redux/store';
import Skeleton from '@mui/material/Skeleton';

export default function VerbatimDatagrid() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const selectedYear = useSelector((state: RootState) => state.year.selectedYear);
  const selectedStatus = useSelector((state: RootState) => state.status.selectedStatus);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  const { data: verbatims = [], isLoading, error } = useQuery<Verbatim[]>(
    ['verbatims', selectedYear, selectedStatus],
    () => fetchVerbatims({ year: selectedYear !== "" ? Number(selectedYear) : undefined, status: selectedStatus })
  );

  useEffect(() => {
    if (selectedRows.length === 0) {
      setSelectedRowIds([]); 
    }
  }, [selectedRows.length]); 
  

  const handleSelectionChange = (selection: GridRowId[]) => {
    setSelectedRowIds(selection);
    const selectedVerbatims = verbatims.filter((verbatim: Verbatim) => selection.includes(verbatim._id));
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
          onClick={() => navigate(`/details/${params.row._id}`)}
          sx={{
            textTransform: 'none',
            backgroundColor: '#2A3E53',
            '&:hover': {
              backgroundColor: '#1c2a37', // Darken on hover
            },
            padding: '6px 12px',
          }}
        >
          Détails
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid size={{ xs: 12 }}>
          <Paper style={{ height: 600, width: '100%', borderRadius: 8, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ backgroundColor: '#F4F4F4', padding: '20px' }}>
      <Grid size={{ xs: 12 ,sm:10, md:10 ,lg:10}}>
        <Paper
          style={{
            height: 550,
            width: '100%',
            borderRadius: 8,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#FFFFFF',
            padding: '10px',
            margin: '0 auto', // This ensures the Paper container is centered
          }}
        >
          <DataGrid
            rows={verbatims}
            columns={columns}
            pagination
            paginationModel={{ pageSize, page }}
            pageSizeOptions={[10, 20, 30]}
            onPaginationModelChange={(model) => {
              setPageSize(model.pageSize);
              setPage(model.page);
            }}
            checkboxSelection
            getRowId={(row) => row._id}
            onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as GridRowId[])}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
