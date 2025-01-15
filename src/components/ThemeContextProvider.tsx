// themeContext.js
import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Créer le contexte du thème
const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: (mode: boolean) => {}
});

export const useThemeContext = () => useContext(ThemeContext);

declare module "@mui/material/styles" {
  interface Palette {
    hover_primary?: Palette['primary'];
  }
  interface PaletteOptions {
    hover_primary?: PaletteOptions['primary'];
  }
}

import { ReactNode } from 'react';

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Créer un thème dynamique
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: 'rgb(48, 111, 180)',
        light: 'rgb(48, 111, 180)', 
        dark: '#1565c0', 
      },
      hover_primary: {
        main: 'rgb(38, 91, 148)',
        light: 'rgb(38, 91, 148)',
        dark: '#ff4400',
      },
      secondary: {
        main: darkMode ? 'rgb(221, 123, 47)' : 'rgb(221, 123, 47)',
      },
      success: {
        main: '#4caf50', // Couleur verte principale
        dark: '#388e3c', // Couleur sombre pour succès
        light: '#80e27e', // Couleur claire pour succès
      },
      warning: {
        main: '#ff9800', // Couleur orange pour l'avertissement
        dark: '#f57c00', // Couleur sombre pour l'avertissement
        light: '#ffb74d', // Couleur claire pour l'avertissement
      },
      error: {
        main: '#f44336', // Couleur rouge pour l'erreur
        dark: '#d32f2f', // Couleur sombre pour l'erreur
        light: '#e57373', // Couleur claire pour l'erreur
      },
      background: {
        default: darkMode ? 'rgb(31,31,31)' : '#f5f5f5', // Fond principal
        paper: darkMode ? '#1d1d1d' : '#ffffff', // Fond des cartes ou surfaces
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000', // Couleur du texte principale
        secondary: darkMode ? '#bbbbbb' : '#555555',
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
