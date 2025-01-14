import React from 'react';
import { Typography, IconButton, Tooltip, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { green, red, orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import VerbatimStatus from '../../models/VerbatimStatus';
import RelaunchVerbatimDetails from './Actions/RelaunchVerbatimDetails';
import DeleteVerbatimDetails from './Actions/DeleteVerbatimDetails';
import Verbatim from '../../models/Verbatim';
import colors from '../../utils/color';

interface DetailsHeaderProps {
  date: string;
  status: VerbatimStatus;
  verbatim: Verbatim;
}

export default function DetailsHeader({ date, status, verbatim }: DetailsHeaderProps) {
  const navigate = useNavigate();

  const renderStatusIcon = (status: VerbatimStatus) => {
    switch (status) {
      case VerbatimStatus.Success:
        return (
          <CheckCircleIcon
            sx={{
              fontSize: '2rem',
              color: green[500],
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '4px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        );
      case VerbatimStatus.Error:
        return (
          <CancelIcon
            sx={{
              fontSize: '2rem',
              color: red[500],
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '4px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        );
      case VerbatimStatus.Run:
        return (
          <HourglassTopIcon
            sx={{
              fontSize: '2rem',
              color: orange[500],
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '4px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
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
        background: colors.secondary,
       // background: `linear-gradient(0deg, rgb(43, 85, 143), ${colors.primary})`,
        color: 'white',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Bouton de retour */}
        <Grid size={{xs:2}} container justifyContent="flex-start">
          <Tooltip title="Retour" arrow>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: 'white',
              }}
              aria-label="Retour"
            >
              <ArrowBackIcon sx={{ fontSize: '1.8rem' }} />
            </IconButton>
          </Tooltip>
        </Grid>

        {/* Contenu central */}
        <Grid size={{xs:8}} container justifyContent="center" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.5rem',
              fontWeight: '600',
              textAlign: 'center',
              marginRight: '10px',
            }}
          >
            {date.slice(0, 10)}
          </Typography>
          <Box>{renderStatusIcon(status)}</Box>
        </Grid>

        {/* Boutons d'action */}
        <Grid size={{xs:2}} container justifyContent="flex-end" alignItems="center">
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <RelaunchVerbatimDetails verbatim={verbatim} />
            <DeleteVerbatimDetails id={verbatim._id} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
