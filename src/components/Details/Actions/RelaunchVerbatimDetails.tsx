import React from 'react';
import Verbatim from '../../../models/Verbatim';
import { Button, useTheme } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch } from 'react-redux';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setToast } from '../../../redux/toastSlice'; // Gestion centralisée des notifications
import { AppDispatch } from '../../../redux/store';

interface RelaunchVerbatimDetailsProps {
  verbatim: Verbatim;
}

export default function RelaunchVerbatimDetails({ verbatim }: RelaunchVerbatimDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const handleRelaunch = () => {
    rerunClassification(
      [verbatim],
      () => dispatch(setToast('Reclassification en cours...', 'success', 5000)),
      () => dispatch(setToast('Une erreur est survenue lors de la reclassification.', 'error', 5000))
    );
  };

  return (
    <Button
      variant="contained"
      startIcon={<ReplayIcon />}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        fontSize: '0.875rem',
        textTransform: 'none',
        padding: '6px 12px',
        borderRadius: '20px',
        boxShadow: theme.shadows[2],
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        },
      }}
      onClick={handleRelaunch}
    >
      Relancer
    </Button>
  );
}
