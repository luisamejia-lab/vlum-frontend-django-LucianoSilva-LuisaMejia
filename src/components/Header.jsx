import { Container, AppBar, Toolbar, Box, Button } from "@mui/material";
import vlumLogo from "../assets/logo.png";
import { isLoggedIn, logout } from "../services/authService";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    alert("Sesión cerrada correctamente");
    window.location.href = "/";
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #000000 0%, #1a0b2e 100%)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(126, 48, 225, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ flexWrap: 'wrap', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={vlumLogo} alt="Vlum Logo" height={45} style={{ filter: 'drop-shadow(0 0 5px #7E30E1)' }} />
              <Box
                component="span"
                sx={{
                  ml: 1.5,
                  fontSize: '2rem',
                  fontWeight: 800,
                  background: 'linear-gradient(120deg, #FFFFFF, #C2185B, #7E30E1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                vlum
              </Box>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: { xs: 2, sm: 0 } }}>
            <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: '#FFAB91' } }}>Inicio</Button>
            <Button color="inherit" component={Link} to="/directors" sx={{ '&:hover': { color: '#FFAB91' } }}>Directores</Button>

            {isLoggedIn() ? (
              <>
                <Button color="inherit" component={Link} to="/add-movie" sx={{ '&:hover': { color: '#FFAB91' } }}>Agregar Película</Button>
                <Button color="inherit" component={Link} to="/add-director" sx={{ '&:hover': { color: '#FFAB91' } }}>Agregar Director</Button>
                <Button color="error" variant="outlined" onClick={handleLogout} sx={{ borderRadius: 4, ml: 1 }}>Cerrar Sesión</Button>
              </>
            ) : (
              <Button variant="contained" component={Link} to="/login" sx={{ borderRadius: 4, background: 'linear-gradient(95deg, #C2185B, #7E30E1)' }}>
                Iniciar Sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
