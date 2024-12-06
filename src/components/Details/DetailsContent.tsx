import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface DetailsContentProps {
  content: string;
}

export default function DetailsContent({ content }: DetailsContentProps) {
  return (
    <Grid size={{xs:12}}>
      <Typography>{content}</Typography>
    </Grid>
  );
}