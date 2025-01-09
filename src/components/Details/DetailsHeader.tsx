import React from 'react';
import { Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { green, red, orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import VerbatimStatus from '../../models/VerbatimStatus';
import { useEffect } from 'react';

interface DetailsHeaderProps {
  date: string;
  status: VerbatimStatus;
}

export default function DetailsHeader({ date, status }: DetailsHeaderProps) {
  const navigate = useNavigate();

  const renderStatusIcon = (status: VerbatimStatus) => {
    switch (status) {
      case VerbatimStatus.Success:
        return <CheckCircleIcon style={{ color: green[500], fontSize: '5rem' }} />;
      case VerbatimStatus.Error:
        return <CancelIcon style={{ color: red[500], fontSize: '5rem' }} />;
      case VerbatimStatus.Run:
        return <HourglassTopIcon style={{ color: orange[500], fontSize: '5rem' }} />;
      default:
        return null;
    }
  };

  useEffect(() => {

  }, [status]);

  return (
    <Grid container spacing={2} alignItems="center" style={{ backgroundColor: '#F4F4F4', padding: '20px', borderRadius: '8px' }}>
      {/* Flèche de retour à gauche */}
      <Grid size={{xs:2}} container justifyContent="flex-start">
        <IconButton onClick={() => navigate('/')} style={{ color: '#2A3E53' }}>
          <ArrowBackIcon style={{ fontSize: '2.5rem' }} />
        </IconButton>
      </Grid>

      {/* Contenu central (date et statut) */}
      <Grid size={{xs:8}} container justifyContent="center" alignItems="center">
        <Typography
          variant="h2"
          style={{
            fontSize: '4rem',  // Très grande taille de police pour le titre
            color: '#2A3E53',
            fontWeight: '600',
            textTransform: 'capitalize',
            textAlign: 'center',
          }}
        >
          {date.substring(0, 10)}
        </Typography>
        <div style={{ marginLeft: '15px' }}>
          {renderStatusIcon(status)}
        </div>
      </Grid>
    </Grid>
  );
}