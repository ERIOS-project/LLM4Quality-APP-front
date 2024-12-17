import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ClassificationResult from '../../models/ClassificationResult';

interface DetailsTablesProps {
  result?: ClassificationResult;
}

// Fonction utilitaire pour créer un tableau de données à partir d'un objet
const createTableData = (data: any) =>
  Object.entries(data as Record<string, boolean | null>).map(([key, value]) => {
    const positive = value === true ? '✔️' : '';
    const negative = value === false ? '✔️' : '';
    const displayValue = value === null ? { positive: 'N/A', negative: 'N/A' } : { positive, negative };
    return {
      name: key,
      ...displayValue,
    };
  });

export default function DetailsTables({ result }: DetailsTablesProps) {
  if (!result) {
    return (
      <Typography variant="h6" color="textSecondary" align="center">
        Aucune donnée disponible.
      </Typography>
    );
  }

  const { QualiteHoteliere, Professionnalisme, CircuitDePriseEnCharge } = result;

  const tables = [
    { title: 'Qualité Hôtelière', data: createTableData(QualiteHoteliere) },
    { title: 'Professionnalisme', data: createTableData(Professionnalisme) },
    { title: 'Circuit de Prise en Charge', data: createTableData(CircuitDePriseEnCharge) },
  ];

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      {tables.map((table, index) => (
        <Grid key={index} size={{ lg: 10 }} display="flex" justifyContent="center">
          <div style={{ textAlign: 'left', width: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {table.title}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ width: '60%' }}></TableCell> {/* Cellule vide pour le titre de la première colonne */}
                    <TableCell align="center" style={{ width: '20%' }}>Positif</TableCell>
                    <TableCell align="center" style={{ width: '20%' }}>Négatif</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.data.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell style={{ width: '60%' }}>{row.name}</TableCell>
                      <TableCell align="center" style={{ width: '20%' }}>{row.positive}</TableCell>
                      <TableCell align="center" style={{ width: '20%' }}>{row.negative}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}