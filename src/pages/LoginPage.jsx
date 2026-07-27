import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { login } from '../services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // <-- Encender
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.access_token);
      navigate('/');
    } catch (error) {
      console.log('Error en login:', error);
      setError('Credenciales incorrectas o error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        borderRadius: 4,
        background: 'rgba(20, 10, 40, 0.65)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(126, 48, 225, 0.3)',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Typography variant="h5" align="center" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
        Iniciar Sesión
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        {error && <Typography color="error" align="center">{error}</Typography>}

        <Button
          variant="contained"
          type="submit"
          size="large"
          disabled={loading}
          sx={{
            mt: 2,
            borderRadius: 8,
            background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(95deg, #C2185B, #7E30E1)',
            color: loading ? 'rgba(255,255,255,0.5)' : '#fff'
          }}
        >
          {loading && <CircularProgress size={20} color="inherit" sx={{ mr: 1.5 }} />}
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </Box>
    </Paper>
  );
}
