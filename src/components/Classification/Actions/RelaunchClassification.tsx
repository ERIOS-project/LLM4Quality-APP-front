import React from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import Verbatim from '../../../models/Verbatim';
import { setSelectedRows } from '../../../redux/selectedRowsSlice';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';

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
    <div>
      <Button
        variant="outlined"
        startIcon={<ReplayIcon />}
        sx={{ fontSize: '1.05rem', padding: '12px 24px', textTransform: 'none' }}
        onClick={handleRelaunch}
      >
        Relancer
      </Button>
    </div>
  );
}