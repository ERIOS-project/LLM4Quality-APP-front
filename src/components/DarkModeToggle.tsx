import React, { useState } from 'react';
import { Popper, Button, Box, Fade, Switch } from '@mui/material';
import { useThemeContext } from './ThemeContextProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '@mui/material/styles'; // Importation de useTheme

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme(); // Utilisation du hook useTheme

  // Hauteur fixe pour le bouton et le popper
  const buttonHeight = 40;

  // Ouvrir/fermer le Popper en cliquant
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleToggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  // Gérer le survol du bouton
  const handleButtonMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleButtonMouseLeave = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  // Gérer le survol du Popper
  const handlePopperMouseEnter = () => {
    setOpen(true);
  };

  const handlePopperMouseLeave = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'relative', top: 160, left: 20 }}>  {/* Positionnement relatif ajouté */}
      <Button
        onClick={handleClick}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        variant="contained"
        sx={{
          padding: 1,
          height: buttonHeight,  // Hauteur fixe du bouton
          backgroundColor: theme.palette.primary.main, // Couleur primaire du thème
          '&:hover': {
            backgroundColor: theme.palette.primary.dark, // Couleur au survol
          },
        }}
      >
        <Brightness4Icon />
      </Button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="right-start" // Le Popper s'ouvrira à la droite du bouton
        transition
        onMouseEnter={handlePopperMouseEnter}
        onMouseLeave={handlePopperMouseLeave}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper, // Fond dynamique en fonction du mode
                width: 130, // Largeur du menu
                height: buttonHeight,  // Hauteur fixée
                boxShadow: theme.palette.mode === 'dark' ? 3 : 6, // Ombre ajustée en fonction du mode
                zIndex: 1300, // Assurez-vous que le popper est bien visible
                display: 'flex',
                alignItems: 'center', // Centrer verticalement le switch
                padding: '0 8px', // Ajouter un padding pour éviter que les éléments touchent les bords
              }}
            >
              <LightModeIcon sx={{ color: theme.palette.text.primary }} />
              <Switch
                checked={darkMode}
                onChange={handleToggleDarkMode}
                color="primary"
                sx={{ margin: '0 8px' }} // Ajouter un margin pour espacer légèrement le switch des icônes
              />
              <DarkModeIcon sx={{ color: theme.palette.text.primary }} />
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}