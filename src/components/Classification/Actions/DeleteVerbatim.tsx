import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { deleteVerbatims } from '../../../api/verbatims';
import { setToast } from '../../../redux/toastSlice';
import { Box } from '@mui/material';
import { useThemeContext } from '../../../components/ThemeContextProvider';
import ConfirmationDialog from '../../ConfirmationDialog'; // Import du composant
import type { AppDispatch } from '../../../redux/store';
import { eventEmitter } from "../../../api/websockets/simpleEventEmitter";

interface DeleteVerbatimProps {
  isMobile: boolean;
}

export default function DeleteVerbatim({ isMobile }: DeleteVerbatimProps) {
  const { darkMode } = useThemeContext();
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);

  const [dialogOpen, setDialogOpen] = useState(false);

  const mutation = useMutation(deleteVerbatims, {
    onSuccess: (data, variables) => {
      eventEmitter.emit("newVerbatim");
      queryClient.invalidateQueries('verbatims');
      dispatch(
        setToast(
          `${variables.length} fichier(s) supprimé(s) avec succès.`,
          'success',
          5000
        )
      );
    },
    onError: () => {
      dispatch(
        setToast(
          'Une erreur est survenue lors de la suppression des fichiers.',
          'error',
          5000
        )
      );
    },
  });

  const handleDelete = () => {
    const ids = selectedRows.map((verbatim) => verbatim._id);
    mutation.mutate(ids);
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Button
          variant="contained"
          startIcon={!isMobile && <DeleteIcon />}
          sx={{
            fontSize: isMobile ? '0' : '1.1rem',
            padding: isMobile ? '12px' : '12px 24px',
            textTransform: 'none',
            borderRadius: isMobile ? '50%' : '8px',
            minWidth:'48px',
            backgroundColor: darkMode ? '#d32f2f' : '#d32f2f',
            color: '#ffffff',
            width: isMobile ? '48px' : 'auto', // Ajuster la largeur pour mobile
            height: isMobile ? '48px' : 'auto', // Ajuster la hauteur pour mobile
            '&:hover': {
              backgroundColor: darkMode ? '#9A0007' : '#9A0007',
            },
          }}
          onClick={handleOpenDialog}
        >
          {isMobile ? <DeleteIcon /> : 'Supprimer'}
        </Button>
      </Box>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        text="Êtes-vous sûr de vouloir supprimer les fichiers sélectionnés ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        confirmColor="error"
      />
    </>
  );
}