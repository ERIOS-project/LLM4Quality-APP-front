import React from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import Verbatim from '../../../models/Verbatim';
import { setSelectedRows } from '../../../redux/selectedRowsSlice';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';
import colors
 from '../../../utils/color';
export default function RelaunchClassification() {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const dispatch = useDispatch();

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
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: colors.primary,
          color: '#ffffff', // Texte en blanc pour contraster
          '&:hover': {
            backgroundColor: colors.hover_primary, // Teinte plus sombre au survol
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)', // Ombre plus marquée pour l'interaction
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
