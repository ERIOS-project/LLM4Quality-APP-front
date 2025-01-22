import React from 'react';
import { useThemeContext } from '../ThemeContextProvider'; // Importer votre contexte
import './DetailsInRun.css';

export default function DetailsInRun() {
  const { darkMode } = useThemeContext(); // Accéder à la valeur du mode sombre

  return (
    <div className={`details-in-run ${darkMode ? 'dark' : 'light'}`}>
      <p>Analyse en cours...</p>
      <div className="bouncing-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
