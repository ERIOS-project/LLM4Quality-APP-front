import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRowId, GridColumnMenu, GridColumnMenuProps , GridColumnMenuFilterItem } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import VerbatimStatus from '../../models/VerbatimStatus';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { setSelectedRows } from '../../redux/selectedRowsSlice';
import Verbatim from '../../models/Verbatim';
import { fetchVerbatims } from '../../api/verbatims';
import { RootState } from '../../redux/store';
import Skeleton from '@mui/material/Skeleton';
import { useQuery, useQueryClient } from 'react-query';
import { eventEmitter } from '../../api/websockets/simpleEventEmitter';
import { frFR } from '@mui/x-data-grid/locales';
import { useTheme } from '@mui/material'; // Import du thème Material-UI
import { Stack } from '@mui/material';

export default function VerbatimDatagrid() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const selectedYear = useSelector((state: RootState) => state.year.selectedYear);
  const selectedStatus = useSelector((state: RootState) => state.status.selectedStatus);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const theme = useTheme(); // Accès au thème

  const { data: verbatims = [], isLoading, error } = useQuery<Verbatim[]>(
    ['verbatims', selectedYear, selectedStatus],
    () =>
      fetchVerbatims({
        year: selectedYear !== '' ? Number(selectedYear) : undefined,
        status: selectedStatus,
      })
  );

  useEffect(() => {
    if (selectedRows.length === 0) {
      setSelectedRowIds([]);
    }
  }, [selectedRows.length]);

  useEffect(() => {
    const handleNewVerbatim = (data: any | string) => {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (error) {
          console.error('Erreur lors du parsing des données WebSocket :', data, error);
          return;
        }
      }

      const formattedData = {
        _id: data.id || data._id,
        content: data.content,
        status: data.status,
        result: data.result,
        year: data.year,
        created_at: data.created_at,
      };

      queryClient.setQueryData<Verbatim[]>(['verbatims', selectedYear, selectedStatus], (oldVerbatims = []) => {
        const existingIndex = oldVerbatims.findIndex((verbatim) => verbatim._id === formattedData._id);

        if (existingIndex !== -1) {
          const updatedVerbatims = [...oldVerbatims];
          updatedVerbatims[existingIndex] = { ...updatedVerbatims[existingIndex], ...formattedData };
          return updatedVerbatims;
        } else {
          return [formattedData, ...oldVerbatims];
        }
      });
    };

    eventEmitter.on('newVerbatim', handleNewVerbatim);

    return () => {
      eventEmitter.off('newVerbatim', handleNewVerbatim);
    };
  }, [queryClient, selectedYear, selectedStatus]);

  const handleSelectionChange = (selection: GridRowId[]) => {
    setSelectedRowIds(selection);
    const selectedVerbatims = verbatims.filter((verbatim: Verbatim) => selection.includes(verbatim._id));
    dispatch(setSelectedRows(selectedVerbatims));
  };

  function CustomColumnMenu(props: GridColumnMenuProps) {
    const itemProps = {
      colDef: props.colDef,
      onClick: props.hideMenu,
    };
  
    return (
      <React.Fragment>
        <Stack px={0.5} py={0.5}>
          {/* Seulement afficher le filtre */}
          <GridColumnMenuFilterItem {...itemProps}  />
        </Stack>
      </React.Fragment>
    );
  }

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date de création',
      width: 200,
      flex: 1,
      disableColumnMenu: true,
      valueGetter: (value, row) => {
        const date = row.created_at;
        return date ? new Date(date).toLocaleDateString() : 'Date non disponible';
      },
    },
    {
      field: 'year',
      headerName: 'Année',
      flex: 1,
      disableColumnMenu: true,
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Statut',
      disableColumnMenu: true,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const getIcon = () => {
          switch (params.value) {
            case VerbatimStatus.Success:
              return <CheckCircleIcon style={{ color: theme.palette.success.main }} />;
            case VerbatimStatus.Error:
              return <CancelIcon style={{ color: theme.palette.error.main }} />;
            case VerbatimStatus.Run:
              return <HourglassTopIcon style={{ color: theme.palette.warning.main }} />;
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
      disableColumnMenu: true,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/details/${params.row._id}`);
          }}
          sx={{
            textTransform: 'none',
            padding: '6px 12px',
            color: theme.palette.text.primary, // Texte noir en mode clair
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
        <Grid size={{ xs: 12, sm: 10, md: 10, lg: 10 }}>
          <Paper
            style={{
              height: 550,
              width: '100%',
              borderRadius: 8,
              boxShadow: theme.shadows[3],
              backgroundColor: theme.palette.background.paper,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Skeleton
              variant="rectangular"
              width="98%"
              height="95%"
              style={{ borderRadius: 8 }}
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Grid size={{ xs: 12, sm: 10, md: 10, lg: 10 }}>
        <Paper
          style={{
            height: 550,
            width: '100%',
            borderRadius: 8,
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.background.paper,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '98%', height: '95%' }}>
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
              slotProps={{
                pagination: {
                  SelectProps: {
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          color: theme.palette.text.secondary, // Texte noir en mode clair
                        },
                      },
                    },
                  },
                },
                columnMenu: {
                  labelledby: 'columnMenu',
                },
              }}
              getRowId={(row) => row.id || row._id}
             
              onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as GridRowId[])}
              localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              sx={{
                '& .MuiDataGrid-cell': {
                  color: theme.palette.text.secondary, // Texte noir en mode clair
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  color: theme.palette.text.secondary, // Texte noir en mode clair
                },
                '& .MuiTablePagination-root': {
                  color: theme.palette.text.secondary, // Texte noir en mode clair
                },
                '& .MuiTablePagination-caption': {
                  color: theme.palette.text.secondary, // Texte noir en mode clair
                },
                '& .MuiTablePagination-selectIcon': {
                  color: theme.palette.text.secondary, // Texte noir en mode clair
                },
                '& .MuiDataGrid-selectedRowCountt':{
                  color: theme.palette.text.secondary, // Texte noir en mode clair
                },
                '& .MuiDataGrid-cell:focus': {
                    outline: 'none'
                },
                '& .MuiDataGrid-cell:focus-within': {
                    outline: 'none'
                }
              }}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}