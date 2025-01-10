import React from "react";
import { useQuery } from "react-query";
import { Tooltip, Typography, Box, CircularProgress } from "@mui/material";
import { fetchCounts } from "../../../api/verbatims";

export const useCounts = () => {
  return useQuery(["counts"], fetchCounts, {
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });
};

// Fonction utilitaire pour déterminer la couleur de la pastille
const getStatusColor = (key: string, isHover: boolean) => {
  switch (key) {
    case "success":
      return isHover ? "#2e7d32" : "green"; // Vert foncé au survol
    case "run":
      return isHover ? "#ff9800" : "orange"; // Orange plus foncé au survol
    case "error":
      return isHover ? "#d32f2f" : "red"; // Rouge foncé au survol
    default:
      return isHover ? "#9e9e9e" : "grey"; // Gris foncé au survol
  }
};

const CountsVerbatim = () => {
  const { data, isLoading, error } = useCounts();

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading counts!</Typography>;

  // Détermine le total global
  const total = data.total || 0;

  // Détermine les valeurs pour chaque statut
  const statuses = [
    { key: "success", label: "Succès", value: data.total_success || 0 },
    { key: "run", label: "En cours", value: data.total_run || 0 },
    { key: "error", label: "Erreur", value: data.total_error || 0 },
  ];

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px" }}>
      {/* Totaux avec les pastilles */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          alignItems: "center",
        }}
      >
        {/* Pastille pour le total */}
        <Tooltip title={`Total: ${total}`} arrow>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "grey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#9e9e9e",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {total}
            </Typography>
          </Box>
        </Tooltip>

        {/* Pastilles pour chaque statut */}
        {statuses.map((status) => (
          <Tooltip
            key={status.key}
            title={`${status.label}: ${status.value}`}
            arrow
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: getStatusColor(status.key, false),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: getStatusColor(status.key, true),
                },
              }}
            >
              {status.value}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default CountsVerbatim;
