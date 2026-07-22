import { Container, Typography } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Vlum - Catálogo de Películas
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Configuración inicial de React + Vite + MUI
      </Typography>
    </Container>
  );
}

export default App;
