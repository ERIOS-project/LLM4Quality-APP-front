import React, { useState } from 'react';
import { Button, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteVerbatims } from '../../../api/verbatims';
import { setToast } from '../../../redux/toastSlice'; // Centralisation des notifications
import { AppDispatch } from '../../../redux/store';
import ConfirmationDialog from '../../ConfirmationDialog'; // Importation du ConfirmationDialog

interface DeleteVerbatimDetailsProps {
  id: string;
}

export default function DeleteVerbatimDetails({ id }: DeleteVerbatimDetailsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false); // État pour gérer l'ouverture du dialogue

  const showToast = (message: string, severity: 'success' | 'error') => {
    dispatch(setToast(message, severity, 5000)); // Gestion centralisée des notifications
  };

  const mutation = useMutation(() => deleteVerbatims([id]), {
    onSuccess: () => {
      queryClient.invalidateQueries('verbatims');
      showToast('Verbatim supprimé avec succès.', 'success');
      navigate('/');
    },
    onError: () => {
      showToast('Une erreur est survenue lors de la suppression du verbatim.', 'error');
    },
  });

  const handleDelete = () => {
    mutation.mutate();
    handleCloseDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
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
        onClick={handleOpenDialog}
        disabled={mutation.isLoading} // Désactivation du bouton pendant le chargement
      >
        Supprimer
      </Button>

      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        title="Confirmation de suppression"
        text="Êtes-vous sûr de vouloir supprimer ce verbatim ?"
        confirmText="Supprimer"
        cancelText="Annuler"
        confirmColor="error"
      />
    </>
  );
}