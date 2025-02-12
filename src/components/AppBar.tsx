import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import chuLogo from "../chu_logo.png"
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, useTheme, useMediaQuery, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SignOutButton } from './SignOutButton';
import DarkModeToggle from './DarkModeToggle'; // Importation du composant DarkModeToggle

export default function MyAppBar() {
  const theme = useTheme(); // Accéder au thème dynamique
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // Vérifier si l'écran est sm ou plus petit
  const [drawerOpen, setDrawerOpen] = useState(false); // État pour contrôler le Drawer

  // Fonction pour ouvrir ou fermer le Drawer
  const toggleDrawer = (open:any) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        bgcolor: theme.palette.primary.main, // Utiliser la couleur principale dynamique
        color: theme.palette.text.primary, // Couleur du texte dynamique
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '80px', // Hauteur de la barre d'application
          padding: 0, // Supprimer le padding par défaut
          width: '100%', // Assurer que le Toolbar occupe toute la largeur
          overflow: 'hidden', // Empêcher tout débordement horizontal
          boxSizing: 'border-box', // Inclure les bordures et padding dans la largeur totale
        }}
      >
        {isXs && (
          <>
            {/* Bouton Menu Hamburger à gauche */}
            <IconButton
              color="inherit"
              aria-label="menu"
              sx={{ ml: 1 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            {/* Drawer ancré à gauche */}
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
             
            >
              <Box
                sx={{ width: 250}}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItem sx={{paddingLeft:0, paddingRight:0}}> 
                    <DarkModeToggle />
                  </ListItem>
                  <ListItem>
                    <SignOutButton />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            flexDirection: isXs ? 'row-reverse' : 'row', // Inverser la direction sur mobile
            overflow: 'hidden', // Éviter les débordements
          }}
        >
          {/* Logo de l'application */}
          <img
            src={chuLogo}
            alt="CHU Logo"
            style={{
              height: isXs ? '130%' : '150%', // Augmenter la taille de l'image en mobile
              marginLeft: isXs ? '16px' : '0',
              marginRight: isXs ? '0' : '16px',
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
              whiteSpace: 'nowrap', // Empêcher le texte de déborder ou de se couper
              overflow: 'hidden',
              textOverflow: 'ellipsis', // Ajouter des points de suspension si le texte déborde
            }}
          >
            LLM4Quality
          </Typography>
        </Box>

        {!isXs && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Composant DarkModeToggle */}
            <DarkModeToggle />
            {/* Bouton de déconnexion */}
            <SignOutButton />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
