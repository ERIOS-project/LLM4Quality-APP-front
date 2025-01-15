import React from 'react';
import { Typography, useTheme } from '@mui/material'; // Importation du thème
import Grid from '@mui/material/Grid2';

interface DetailsContentProps {
  content: string;
}

export default function DetailsContent({ content }: DetailsContentProps) {
  const theme = useTheme(); // Utilisation du thème Material-UI

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
      <Grid size={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
        <Typography
          variant="h6"
          style={{
            textAlign: 'left', // Aligné à gauche
            color: theme.palette.primary.main, // Couleur principale du texte selon le thème
            fontWeight: 'bold', // Plus gras pour souligner l'importance
            textTransform: 'uppercase', // Majuscules pour un ton formel et professionnel
            marginBottom: '10px', // Espacement en bas pour séparer du contenu
          }}
        >
          Contenu du Verbatim
        </Typography>
        <Typography
          sx={{
            textAlign: 'justify', // Alignement du texte pour une meilleure lisibilité
            color: theme.palette.text.secondary, // Couleur secondaire pour le texte
            fontSize: '1.2rem', // Taille de texte légèrement plus grande pour plus de confort
            lineHeight: 1.6, // Espacement des lignes pour une lecture plus facile
            fontWeight: '400', // Police régulière pour un ton sérieux et professionnel
            backgroundColor: theme.palette.action.hover, // Fond selon le thème
            padding: '20px', // Espacement interne pour éviter que le texte ne touche les bords
            borderRadius: '8px', // Coins arrondis pour une finition élégante
            boxShadow: theme.shadows[1], // Ombre légère pour donner de la profondeur
            height: '300px', // Hauteur fixe pour permettre le défilement
            overflowY: 'auto', // Permet de défiler si le contenu est trop long
          }}
        >
          {content}
        </Typography>
      </Grid>
    </Grid>
  );
}
