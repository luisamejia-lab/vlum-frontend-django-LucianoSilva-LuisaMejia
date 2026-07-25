import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          mb: 2,
          fontSize: { xs: '6rem', md: '10rem' },
          background: 'linear-gradient(120deg, #C2185B, #7E30E1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, color: '#f0f0f0', fontWeight: 500 }}>
        Oops... La ruta que buscas no existe en el catálogo.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          borderRadius: 8,
          background: 'linear-gradient(95deg, #C2185B, #7E30E1)',
          px: 4,
          py: 1.5,
          fontWeight: 700,
          boxShadow: '0 4px 15px rgba(194, 24, 91, 0.4)'
        }}
      >
        Volver al Inicio
      </Button>
    </Box>
  );
}
