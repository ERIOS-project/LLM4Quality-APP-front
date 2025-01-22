import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DetailsHeader from '../components/Details/DetailsHeader';
import DetailsContent from '../components/Details/DetailsContent';
import DetailsTables from '../components/Details/DetailsTables';
import { fetchVerbatims } from '../api/verbatims';
import Verbatim from '../models/Verbatim';

export default function VerbatimDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: verbatims = [], isLoading, error } = useQuery<Verbatim[]>('verbatims', () => fetchVerbatims());

  // Recherche du verbatim correspondant dans les données récupérées
  const verbatim = verbatims.find((v: any) => v._id === id);

  // Gestion du cas où le verbatim n'est pas trouvé
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!verbatim) {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid size={{xs:12}}>
          <Typography variant="h1">Verbatim Not Found</Typography>
        </Grid>
        <Grid size={{xs:12}}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Back to Classification
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100%' }}>
      <Grid size={{xs:12}} style={{ marginBottom: '16px' }}>
        <DetailsHeader date={verbatim.created_at} status={verbatim.status} verbatim={verbatim} />
      </Grid>
      <Grid size={{xs:12}} style={{ marginBottom: '16px' }}>
        <DetailsContent content={verbatim.content} />
      </Grid>
      <Grid size={{xs:12}} style={{ marginBottom: '16px' }}>
        <DetailsTables result={verbatim.result} status={verbatim.status} />
      </Grid>
    </Grid>
  );
}