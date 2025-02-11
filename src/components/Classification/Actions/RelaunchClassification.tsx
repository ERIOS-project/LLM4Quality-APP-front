import React from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import Verbatim from '../../../models/Verbatim';
import { deselectAllRows, setSelectedRows } from '../../../redux/selectedRowsSlice';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setToast } from '../../../redux/toastSlice'; // Utilisation du thunk centralisé
import { useTheme } from '@mui/material';

interface RelaunchClassificationProps {
  isMobile: boolean;
}

export default function RelaunchClassification({ isMobile }: RelaunchClassificationProps) {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  // Vérification de l'état désactivé
  const isDisabled = selectedRows.length === 0;

  const showToast = (message: string, severity: 'success' | 'error' | 'warning' | 'info' ) => {
    dispatch(setToast(message, severity, 5000));
  };

  const handleRelaunch = () => {
    const verbatims: Verbatim[] = selectedRows.filter((row): row is Verbatim => row.hasOwnProperty('_id'));
    dispatch(deselectAllRows());

    if (verbatims.length > 0) {
      rerunClassification(
        verbatims,
        () => showToast('Reclassification en cours...', 'warning'),
        () => showToast('Une erreur est survenue lors de la reclassification.', 'error')
      );
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Button
        variant="contained"
        startIcon={!isMobile && <ReplayIcon />} // Afficher l'icône uniquement si ce n'est pas mobile
        disabled={isDisabled} // Désactivation si aucune ligne n'est sélectionnée
        sx={{
          fontSize: isMobile ? '0' : '1.1rem', // Ajuster la taille de la police pour mobile
          padding: isMobile ? '12px' : '12px 24px', // Ajuster le padding pour mobile
          textTransform: 'none', // Garde la police naturelle
          borderRadius: isMobile ? '50%' : '8px', // Coins arrondis pour un aspect moderne ou rond pour mobile
          backgroundColor: isDisabled
            ? theme.palette.action.disabledBackground
            : theme.palette.primary.main, // Couleur désactivée ou primaire
          color: isDisabled
            ? theme.palette.action.disabled
            : theme.palette.getContrastText(theme.palette.primary.main), // Contraste automatique ou couleur désactivée
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 10px rgba(255, 255, 255, 0.1)'
            : '0 4px 10px rgba(0, 0, 0, 0.1)', // Ombre ajustée en fonction du mode
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
          width: isMobile ? '48px' : 'auto', // Ajuster la largeur pour mobile
          height: isMobile ? '48px' : 'auto', // Ajuster la hauteur pour mobile
          minWidth: 'auto', // Supprimer la largeur minimale par défaut
        }}
        onClick={handleRelaunch}
      >
        {isMobile ? <ReplayIcon /> : 'Relancer'} {/* Afficher l'icône au centre si mobile, sinon le texte */}
      </Button>
    </div>
  );
}