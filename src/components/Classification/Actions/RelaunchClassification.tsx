import React from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import Verbatim from '../../../models/Verbatim';
import { setSelectedRows } from '../../../redux/selectedRowsSlice';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setToast } from '../../../redux/toastSlice'; // Utilisation du thunk centralisé
import { useTheme } from '@mui/material';

export default function RelaunchClassification() {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  // Vérification de l'état désactivé
  const isDisabled = selectedRows.length === 0;

  const showToast = (message: string, severity: 'success' | 'error') => {
    dispatch(setToast(message, severity, 5000));
  };

  const handleRelaunch = () => {
    const verbatims: Verbatim[] = selectedRows.filter((row): row is Verbatim => row.hasOwnProperty('_id'));
    dispatch(setSelectedRows([]));

    if (verbatims.length > 0) {
      rerunClassification(
        verbatims,
        () => showToast('Reclassification en cours...', 'success'),
        () => showToast('Une erreur est survenue lors de la reclassification.', 'error')
      );
    }
  };

  return (
    <div style={{  display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        startIcon={<ReplayIcon />}
        disabled={isDisabled} // Désactivation si aucune ligne n'est sélectionnée
        sx={{
          fontSize: '1.1rem',
          padding: '12px 24px',
          textTransform: 'none',
          borderRadius: '8px',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 10px rgba(255, 255, 255, 0.1)'
            : '0 4px 10px rgba(0, 0, 0, 0.1)', // Ombre ajustée en fonction du mode
          backgroundColor: isDisabled
            ? theme.palette.action.disabledBackground
            : theme.palette.primary.main, // Couleur désactivée ou primaire
          color: isDisabled
            ? theme.palette.action.disabled
            : theme.palette.getContrastText(theme.palette.primary.main), // Contraste automatique ou couleur désactivée
          '&:hover': {
            backgroundColor: isDisabled
              ? theme.palette.action.disabledBackground
              : theme.palette.primary.dark, // Pas de changement si désactivé
            boxShadow: isDisabled
              ? 'none'
              : theme.palette.mode === 'dark'
                ? '0 6px 15px rgba(255, 255, 255, 0.2)'
                : '0 6px 15px rgba(0, 0, 0, 0.2)', // Ombre au survol
          },
          '&:active': {
            backgroundColor: isDisabled
              ? theme.palette.action.disabledBackground
              : theme.palette.primary.dark, // Pas de changement si désactivé
          },
        }}
        onClick={handleRelaunch}
      >
        Relancer
      </Button>
    </div>
  );
}
