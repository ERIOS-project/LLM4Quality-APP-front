import React from 'react';
import { Box, Switch } from '@mui/material';
import { useThemeContext } from './ThemeContextProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useThemeContext();

  const handleToggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  return (
    <Box
      sx={{
        width: 130, // Largeur du menu
        height: 40, // Hauteur fixée
        zIndex: 1300, // Assurez-vous que le composant est bien visible
        display: 'flex',
        alignItems: 'center', // Centrer verticalement le switch
        padding: '0 8px', // Ajouter un padding pour éviter que les éléments touchent les bords
      }}
    >
      <LightModeIcon sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.5)' : '#FFD700' }} />
      <Switch
        checked={darkMode}
        onChange={handleToggleDarkMode}
        color="primary"
        sx={{ margin: '0 8px' }} // Ajouter un margin pour espacer légèrement le switch des icônes
      />
      <DarkModeIcon sx={{ color: darkMode ? '#FFD700' : 'rgba(0, 0, 0, 0.5)' }} />
    </Box>
  );
}