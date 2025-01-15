import React from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import Verbatim from '../../../models/Verbatim';
import { setSelectedRows } from '../../../redux/selectedRowsSlice';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';
import { useTheme } from '@mui/material'; // Importation de useTheme pour gérer le mode sombre/clair

export default function RelaunchClassification() {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const dispatch = useDispatch();
  const theme = useTheme(); // Utilisation du hook useTheme pour accéder au thème actuel

  const handleRelaunch = () => {
    // Vérifiez que les lignes sélectionnées sont de type Verbatim
    const verbatims: Verbatim[] = selectedRows.filter((row): row is Verbatim => row.hasOwnProperty('_id'));
    dispatch(setSelectedRows([]));

    if (verbatims.length > 0) {
      rerunClassification(
        verbatims,
        () => dispatch(setSuccessToast({ open: true, message: 'Reclassification en cours...' })),
        () => dispatch(setErrorToast({ open: true, message: 'Une erreur est survenue lors de la reclassification.' }))
      );
    }
  };

  return (
    <div style={{ justifyContent: 'center', marginTop: '20px' }}>
      <Button
        variant="contained"
        startIcon={<ReplayIcon />}
        sx={{
          fontSize: '1.1rem',
          padding: '12px 24px',
          textTransform: 'none',
          borderRadius: '8px',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 4px 10px rgba(255, 255, 255, 0.1)' 
            : '0 4px 10px rgba(0, 0, 0, 0.1)', // Ombre ajustée en fonction du mode
          backgroundColor: theme.palette.primary.main, // Utilisation de la couleur primaire du thème
          color: theme.palette.getContrastText(theme.palette.primary.main), // Contraste automatique pour le texte
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? theme.palette.primary.dark 
              : theme.palette.primary.dark, // Teinte plus sombre au survol
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 6px 15px rgba(255, 255, 255, 0.2)' 
              : '0 6px 15px rgba(0, 0, 0, 0.2)', // Ombre plus marquée au survol
          },
          '&:active': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? theme.palette.primary.dark 
              : theme.palette.primary.dark, // Encore plus foncé au clic
          },
          verticalAlign: 'middle',
        }}
        onClick={handleRelaunch}
      >
        Relancer
      </Button>
    </div>
  );
}
