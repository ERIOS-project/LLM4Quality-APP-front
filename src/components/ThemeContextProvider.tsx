import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie'; // Importation de js-cookie

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

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  // Lire la préférence du mode sombre depuis les cookies
  const [darkMode, setDarkMode] = useState(() => {
    const cookieValue = Cookies.get('darkMode');
    return cookieValue ? cookieValue === 'true' : false;
  });

  // Mettre à jour les cookies lorsque le mode sombre change
  useEffect(() => {
    Cookies.set('darkMode', darkMode.toString(), { expires: 365 });
  }, [darkMode]);

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
        primary: darkMode ? '#ffffff' : '#ffffff', // Couleur du texte principale
        secondary: darkMode ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
      },
    },
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: "#ffffff", // Couleur du switch en mode non coché
            "&.Mui-checked": {
              color: "#ffffff" // Couleur du switch en mode coché
            }
          },
          track: {
            backgroundColor: "#ffffff", // Couleur de la piste en mode non coché
            "&.Mui-checked": {
              backgroundColor: "#ffffff" // Couleur de la piste en mode coché
            }
          }
        }
      }
    }
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};