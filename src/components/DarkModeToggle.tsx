import React from 'react';
import { Box, Switch, useMediaQuery, useTheme } from '@mui/material';
import { useThemeContext } from './ThemeContextProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Vérifier si l'écran est mobile

  const handleToggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  if (isMobile) {
    // Version mobile (composant plein écran)
    return (
      <Box
        sx={{
          width: '100%', // Toujours pleine largeur
          height: 50, // Hauteur ajustée pour mobile
          zIndex: 1300, // Assurez-vous que le composant est bien visible
          display: 'flex',
          alignItems: 'center', // Centrer verticalement les éléments
          justifyContent: 'space-between', // Espacer les éléments
          padding: '0 8px', // Réduire le padding pour éviter tout débordement
          backgroundColor: darkMode
            ? theme.palette.background.paper // Fond clair pour le dark mode
            : '#f0f0f0', // Fond clair renforcé pour le light mode
          boxShadow: darkMode
            ? '0 4px 12px rgba(0, 0, 0, 0.5)' // Ombre marquée en dark mode
            : '0 4px 12px rgba(0, 0, 0, 0.1)', // Ombre légère en light mode
          overflowX: 'hidden', // Empêcher le défilement horizontal
        }}
      >
        <LightModeIcon
          sx={{
            color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#FFA726', // Orange vif pour le light mode
            fontSize: '1.5rem', // Taille réduite pour mobile
          }}
        />
        <Switch
          checked={darkMode}
          onChange={handleToggleDarkMode}
          color="primary"
          sx={{
            '& .MuiSwitch-thumb': {
              backgroundColor: darkMode ? '#FFA726' : '#555', // Meilleure couleur pour la visibilité
            },
            '& .MuiSwitch-track': {
              backgroundColor: darkMode ? '#444' : '#555', // Contraste augmenté pour les deux modes
            },
          }}
        />
        <DarkModeIcon
          sx={{
            color: darkMode ? '#FFA726' : 'rgba(0, 0, 0, 0.6)', // Icône orange vif en dark mode, gris foncé en light mode
            fontSize: '1.5rem', // Taille réduite pour mobile
          }}
        />
      </Box>
    );
  } else {
    // Version bureau (composant compact)
    return (
      <Box
        sx={{
          width: 130, // Largeur fixe pour la version bureau
          height: 40, // Hauteur fixe
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
}
