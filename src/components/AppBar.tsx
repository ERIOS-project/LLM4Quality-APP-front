import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { SignOutButton } from './SignOutButton';

export default function MyAppBar() {
    return (
        <AppBar position="static" elevation={4} sx={{
            bgcolor: '#2A3E53', // Bleu-gris professionnel, qui évoque la confiance
            color: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Ombre légère pour de la profondeur
        }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Nom de l'application avec une police élégante et épurée */}
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 'bold', 
                            fontFamily: '"Montserrat", sans-serif', // Police moderne et professionnelle
                            fontSize: '1.6rem', 
                            letterSpacing: '0.8px', // Espacement légèrement plus large pour l'aération
                            textTransform: 'uppercase', // Texte en majuscules pour plus de professionnalisme
                        }}
                    >
                        LLM4Quality
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Bouton de déconnexion avec un léger espacement */}
                    <SignOutButton />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
