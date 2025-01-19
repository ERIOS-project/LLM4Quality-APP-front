import React from "react";
import { useQuery } from "react-query";
import { Tooltip, Typography, Box, Skeleton } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchCounts } from "../../../api/verbatims";
import { useTheme } from "@mui/material/styles"; // Importation de `useTheme`
import { green, red, orange } from "@mui/material/colors";

// Composant pour afficher les statistiques
const CountsVerbatim = () => {
  const theme = useTheme(); // Utilisation de `useTheme` pour récupérer le thème
  const { data, isLoading, error } = useQuery(["counts"], fetchCounts);

  if (error)
    return <Typography color="error">Error loading counts!</Typography>;

  const statuses = [
    {
      key: "success",
      label: "Succès",
      value: data?.total_success || 0,
      icon: <CheckCircleIcon sx={{ fontSize: 50, color: green[500] }} />,
    },
    {
      key: "run",
      label: "En cours",
      value: data?.total_run || 0,
      icon: <HourglassTopIcon sx={{ fontSize: 50, color: orange[500] }} />,
    },
    {
      key: "error",
      label: "Erreurs",
      value: data?.total_error || 0,
      icon: <CancelIcon sx={{ fontSize: 50, color: red[500] }} />,
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Skeletons pour imiter le layout final */}
          {[1, 2, 3].map((_, index) => (
            <Box
              key={index}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                animation="wave"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "8px",
                  height: "50px",
                  justifyContent: "center",
                }}
              >
                <Skeleton
                  variant="text"
                  width={30}
                  height={24}
                  animation="wave"
                  sx={{ marginTop: 1 }}
                />
                <Skeleton
                  variant="text"
                  width={50}
                  height={16}
                  animation="wave"
                  sx={{ marginTop: 0.5 }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          alignItems: "center",
        }}
      >
        {/* Cercles pour chaque statut */}
        {statuses.map((status) => (
          <Tooltip
            key={status.key}
            title={`${status.label}: ${status.value}`}
            arrow
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Box>{status.icon}</Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: "8px",
                    height: "50px",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: "bold",
                      marginBottom: "0px",
                      lineHeight: 0.8,
                      fontSize: 24,
                    }}
                  >
                    {status.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.text.secondary, fontSize: 13 }}
                  >
                    {status.label}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default CountsVerbatim;