import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmationDialog from './ConfirmationDialog'; // Importation du ConfirmationDialog

export const SignOutButton = () => {
  const { instance } = useMsal();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Vérifier si l'écran est mobile
  const [openDialog, setOpenDialog] = useState(false); // État pour gérer l'ouverture du dialogue

  // Fonction pour gérer la déconnexion
  const handleLogout = (logoutType: any) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  // Fonction pour ouvrir le dialogue de confirmation
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Fonction pour fermer le dialogue de confirmation
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Fonction pour confirmer la déconnexion
  const handleConfirmLogout = () => {
    handleLogout("redirect");
    handleCloseDialog();
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpenDialog}
        sx={{
          padding: isMobile ? '8px 16px' : 1,
          borderRadius: isMobile ? '4px' : '50%', // Bouton arrondi pour non-mobile
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        {isMobile ? (
          <Typography
            sx={{
              color: theme.palette.text.secondary, // Couleur secondaire du texte
              fontWeight: 'bold',
            }}
          >
            Se déconnecter
          </Typography>
        ) : (
          <LogoutIcon />
        )}
      </Button>

      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmLogout}
        title="Confirmation de déconnexion"
        text="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Se déconnecter"
        cancelText="Annuler"
        confirmColor="primary"
      />
    </>
  );
};