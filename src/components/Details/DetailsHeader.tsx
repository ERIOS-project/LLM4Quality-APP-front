import React from 'react';
import { Typography, IconButton, Tooltip, Box, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import VerbatimStatus from '../../models/VerbatimStatus';
import RelaunchVerbatimDetails from './Actions/RelaunchVerbatimDetails';
import DeleteVerbatimDetails from './Actions/DeleteVerbatimDetails';
import Verbatim from '../../models/Verbatim';

interface DetailsHeaderProps {
  date: string;
  status: VerbatimStatus;
  verbatim: Verbatim;
}

export default function DetailsHeader({ date, status, verbatim }: DetailsHeaderProps) {
  const theme = useTheme(); // Utilisation du thème Material-UI
  const navigate = useNavigate();

  const renderStatusIcon = (status: VerbatimStatus) => {
    switch (status) {
      case VerbatimStatus.Success:
        return (
          <CheckCircleIcon
            sx={{
              fontSize: '2rem',
              color: theme.palette.success.main, // Couleur "succès" du thème
              backgroundColor: theme.palette.background.paper, // Fond adapté au thème
              borderRadius: '50%',
              padding: '4px',
              boxShadow: theme.shadows[2], // Ombre selon le thème
            }}
          />
        );
      case VerbatimStatus.Error:
        return (
          <CancelIcon
            sx={{
              fontSize: '2rem',
              color: theme.palette.error.main, // Couleur "erreur" du thème
              backgroundColor: theme.palette.background.paper,
              borderRadius: '50%',
              padding: '4px',
              boxShadow: theme.shadows[2],
            }}
          />
        );
      case VerbatimStatus.Run:
        return (
          <HourglassTopIcon
            sx={{
              fontSize: '2rem',
              color: theme.palette.warning.main, // Couleur "avertissement" du thème
              backgroundColor: theme.palette.background.paper,
              borderRadius: '50%',
              padding: '4px',
              boxShadow: theme.shadows[2],
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: theme.palette.secondary.main, // Dégradé basé sur le thème
        color: theme.palette.primary.contrastText, // Texte contrasté
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Bouton de retour */}
        <Grid size={{ xs: 2 }} container justifyContent="flex-start">
          <Tooltip title="Retour" arrow>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: theme.palette.primary.contrastText,
              }}
              aria-label="Retour"
            >
              <ArrowBackIcon sx={{ fontSize: '1.8rem' }} />
            </IconButton>
          </Tooltip>
        </Grid>

        {/* Contenu central */}
        <Grid size={{ xs: 8 }} container justifyContent="center" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              textAlign: 'center',
              marginRight: '10px',
              color: theme.palette.text.primary // Couleur du texte contrastée
            }}
          >
            {date.slice(0, 10)}
          </Typography>
          <Box>{renderStatusIcon(status)}</Box>
        </Grid>

        {/* Boutons d'action */}
        <Grid size={{ xs: 2 }} container justifyContent="flex-end" alignItems="center">
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <RelaunchVerbatimDetails verbatim={verbatim} />
            <DeleteVerbatimDetails id={verbatim._id} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
