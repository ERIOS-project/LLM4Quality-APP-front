import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ClassificationResult from '../../models/ClassificationResult';

interface DetailsTablesProps {
  result?: ClassificationResult;
}

// Fonction utilitaire pour créer un tableau de données à partir d'un objet
const createTableData = (data: any) =>
  Object.entries(data as Record<string, boolean | undefined>).map(([key, value]) => ({
    name: key,
    positive: value === true ? '✔️' : '',
    negative: value === false ? '✔️' : '',
  }));

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
        <Grid key={index} size={{lg:10}} display="flex" justifyContent="center">
          <div style={{ textAlign: 'left', width: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {table.title}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell> {/* Cellule vide pour le titre de la première colonne */}
                    <TableCell align="center">Positif</TableCell>
                    <TableCell align="center">Négatif</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.data.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.positive}</TableCell>
                      <TableCell align="center">{row.negative}</TableCell>
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
