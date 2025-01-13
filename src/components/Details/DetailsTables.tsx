import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ClassificationResult from '../../models/ClassificationResult';
import colors from '../../utils/color';

interface DetailsTablesProps {
  result?: ClassificationResult;
}

// Fonction utilitaire pour créer un tableau de données à partir d'un objet
const createTableData = (data: any) =>
  Object.entries(data as Record<string, { positive: 0 | 1; negative: 0 | 1 } | null>).map(([key, value]) => {
    let positive = '';
    let negative = '';
    if (value) {
      positive = value.positive === 1 ? '✔️' : '';
      negative = value.negative === 1 ? '✔️' : '';
    }
    const displayValue = value && value.positive === 0 && value.negative === 0 ? { positive: 'N/A', negative: 'N/A' } : { positive, negative };
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

  const { qualite_hoteliere, professionnalisme_de_l_equipe, circuit_de_prise_en_charge } = result;

  const tables = [
    { title: 'Qualité Hôtelière', data: createTableData(qualite_hoteliere) },
    { title: 'Professionnalisme', data: createTableData(professionnalisme_de_l_equipe) },
    { title: 'Circuit de Prise en Charge', data: createTableData(circuit_de_prise_en_charge) },
  ];

  // Largeurs fixes pour toutes les tables
  const tableColumnWidths = {
    name: '60%',
    positive: '20%',
    negative: '20%',
  };

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      {tables.map((table, index) => (
        <Grid key={index} size={{ xs: 11 ,sm:10, md:10 ,lg:10 }} display="flex" justifyContent="center">
          <div style={{ textAlign: 'left', width: '100%' }}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              style={{
                color: colors.primary, // Couleur principale de l'application
                textTransform: 'uppercase', // Mettre en majuscules pour un ton plus formel
              }}
            >
              {table.title}
            </Typography>
            <TableContainer component={Paper} style={{ borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#FFFFFF' }}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}>
                    <TableCell align="center" style={{ width: tableColumnWidths.name, color: '#FFFFFF' }}><strong>Critères</strong></TableCell>
                    <TableCell align="center" style={{ width: tableColumnWidths.positive, color: '#FFFFFF' }}><strong>Positif</strong></TableCell>
                    <TableCell align="center" style={{ width: tableColumnWidths.negative, color: '#FFFFFF' }}><strong>Négatif</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.data.map((row, idx) => (
                    <TableRow key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#F9F9F9' : '#FFFFFF' }}>
                      <TableCell style={{ width: tableColumnWidths.name }}>{row.name}</TableCell>
                      <TableCell align="center" style={{ width: tableColumnWidths.positive }}>{row.positive}</TableCell>
                      <TableCell align="center" style={{ width: tableColumnWidths.negative }}>{row.negative}</TableCell>
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
