import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; // Icône de fermeture
import { useTheme } from '@mui/material';
import { useThemeContext } from './ThemeContextProvider'; // Importation du ThemeContext

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'error' | 'secondary';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  text,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmColor = 'primary',
}) => {
  const theme = useTheme();
  const { darkMode } = useThemeContext(); // Utilisation du ThemeContext pour obtenir le mode

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper, // Modifier la couleur de fond
        },
      }}
    >
      {title && (
        <DialogTitle id="confirmation-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: theme.palette.text.secondary }}>
          {title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'transparent', // Désactiver l'effet de survol
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description" sx={{ color: theme.palette.text.secondary }}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: darkMode ? theme.palette.grey[300] : theme.palette.grey[700],
            '&:hover': {
              backgroundColor: 'transparent', // Désactiver l'effet de survol
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmColor}
          autoFocus
          sx={{
            color: darkMode ? theme.palette.primary.light : theme.palette.primary.dark,
            '&:hover': {
              backgroundColor: 'transparent', // Désactiver l'effet de survol
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;