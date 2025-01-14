import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { SignOutButton } from './SignOutButton';
import colors from '../utils/color';

export default function MyAppBar() {
    return (
        <AppBar
            position="static"
            elevation={4}
            sx={{
                bgcolor: colors.primary, // Couleur principale de l'application
                color: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Ombre légère
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Section à gauche avec fond blanc */}
    
                        {/* Logo de l'application */}
                        <img
                            src="/src/chu_logo.png"
                            alt="CHU Logo"
                            style={{
                                height: '80px',
                                marginRight: '16px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
                            }}
                        />
                   
                    {/* Nom de l'application */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: '1.6rem',
                            letterSpacing: '0.8px',
                            textTransform: 'uppercase',
                        }}
                    >
                        LLM4Quality
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Bouton de déconnexion */}
                    <SignOutButton />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
