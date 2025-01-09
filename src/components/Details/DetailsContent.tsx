import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface DetailsContentProps {
  content: string;
}

export default function DetailsContent({ content }: DetailsContentProps) {
  return (
    <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
      <Grid size={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
        <Typography
          variant="h6"
          style={{
            textAlign: 'left', // Aligné à gauche
            color: '#2A3E53', // Correspond à la couleur de l'appbar
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
            color: '#2A3E53', // Couleur du texte pour correspondre à l'appbar
            fontSize: '1.2rem', // Taille de texte légèrement plus grande pour plus de confort
            lineHeight: 1.6, // Espacement des lignes pour une lecture plus facile
            fontWeight: '400', // Police régulière pour un ton sérieux et professionnel
            backgroundColor: '#F4F4F4', // Fond doux pour correspondre à l'arrière-plan de l'app
            padding: '20px', // Espacement interne pour éviter que le texte ne touche les bords
            borderRadius: '8px', // Coins arrondis pour une finition élégante
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Ombre légère pour donner de la profondeur
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