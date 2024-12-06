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

interface DetailsHeaderProps {
  date: Date;
  status: VerbatimStatus;
}

export default function DetailsHeader({ date, status }: DetailsHeaderProps) {
  const navigate = useNavigate();

  const renderStatusIcon = (status: VerbatimStatus) => {
    switch (status) {
      case VerbatimStatus.Success:
        return <CheckCircleIcon style={{ color: green[500], fontSize: '6rem',verticalAlign: 'middle' }} />;
      case VerbatimStatus.Error:
        return <CancelIcon style={{ color: red[500], fontSize: '5rem' }} />;
      case VerbatimStatus.Run:
        return <HourglassTopIcon style={{ color: orange[500], fontSize: '5rem' }} />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{xs:2}}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon style={{ fontSize: '3rem' }} />
        </IconButton>
      </Grid>
      <Grid size={{xs:8}} container justifyContent="center" alignItems="center">
        <Typography variant="h6" style={{ fontSize: '5rem'}}>
          {date.toLocaleDateString('fr-FR')}
        </Typography>
          {renderStatusIcon(status)}

      </Grid>
    </Grid>
  );
}