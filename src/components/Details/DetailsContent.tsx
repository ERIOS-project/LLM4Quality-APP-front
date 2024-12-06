import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface DetailsContentProps {
  content: string;
}

export default function DetailsContent({ content }: DetailsContentProps) {
  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid size={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
            <Typography>{content}</Typography>
        </Grid>
    </Grid>
  );
}