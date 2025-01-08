import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DetailsHeader from '../components/Details/DetailsHeader';
import DetailsActions from '../components/Details/DetailsActions';
import DetailsContent from '../components/Details/DetailsContent';
import DetailsTables from '../components/Details/DetailsTables';
import { fetchVerbatims } from '../api/verbatims';
import Verbatim from '../models/Verbatim';

export default function VerbatimDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: verbatims = [], isLoading, error } = useQuery<Verbatim[]>('verbatims', fetchVerbatims);

  // Recherche du verbatim correspondant dans les données récupérées
  const verbatim = verbatims.find((v) => v._id === id);

  // Gestion du cas où le verbatim n'est pas trouvé
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!verbatim) {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12}}>
          <Typography variant="h1">Verbatim Not Found</Typography>
        </Grid>
        <Grid size={{ xs: 12}}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Back to Classification
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <DetailsHeader date={verbatim.created_at} status={verbatim.status} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <DetailsActions verbatim={verbatim} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <DetailsContent content={verbatim.content} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <DetailsTables result={verbatim.result} />
      </div>
    </div>
  );
}