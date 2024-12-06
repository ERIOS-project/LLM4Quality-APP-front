import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DetailsHeader from '../components/Details/DetailsHeader';
import DetailsActions from '../components/Details/DetailsActions';
import DetailsContent from '../components/Details/DetailsContent';
import DetailsTables from '../components/Details/DetailsTables';

export default function VerbatimDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Recherche du verbatim correspondant dans le state
  const verbatim = useSelector((state: RootState) =>
    state.verbatims.find((v) => v.id === id)
  );

  // Gestion du cas où le verbatim n'est pas trouvé
  if (!verbatim) {
    return (
      <Grid container spacing={2}>
        <Grid size={{xs: 12}}>
          <Typography variant="h1">Verbatim Not Found</Typography>
        </Grid>
        <Grid size={{xs: 12}}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Back to Classification
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
        <DetailsHeader date={verbatim.created_at} status={verbatim.status} />
        <DetailsActions verbatim={verbatim} />
        <DetailsContent content={verbatim.content}/>
        <DetailsTables result={verbatim.result}/>
    </div>
  );
}