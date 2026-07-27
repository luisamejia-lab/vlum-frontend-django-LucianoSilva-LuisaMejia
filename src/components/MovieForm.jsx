import { Box, TextField, Typography, Button, Paper, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addMovie, getMovie, updateMovie } from "../services/MovieService";
import { useSnackbar } from "./SnackbarContext";

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [movieData, setMovieData] = useState({
    title: "",
    year: "",
    country: "",
    director: "",
    synopsis: "",
    genres: "",
    picture: null,
  });

  useEffect(() => {
    if (id) {
      getMovie(id).then(data => {
        setMovieData({
          title: data.title || "",
          year: data.year || "",
          country: data.country || "",
          director: data.director || "",
          synopsis: data.synopsis || "",
          genres: data.genres || "",
          picture: null
        });
      }).catch(error => showSnackbar("Error cargando datos de la película.", "error"));
    }
  }, [id]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setMovieData({ ...movieData, picture: files[0] });
    } else {
      setMovieData({ ...movieData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateMovie(id, movieData);
        showSnackbar("Película actualizada correctamente", "success");
      } else {
        await addMovie(movieData);
        showSnackbar("Película agregada correctamente", "success");
      }

      navigate('/');

    } catch (error) {
      showSnackbar(`Error ${id ? 'actualizando' : 'agregando'} película. Revisa los datos.`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 4,
        borderRadius: 4,
        background: 'rgba(20, 10, 40, 0.65)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(126, 48, 225, 0.3)',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Typography
      variant="h4"
      align="center"
      gutterBottom
      sx={{ fontWeight: 700, color: '#fff', mb: 3 }}>
        {id ? "Editar Película" : "Añadir Nueva Película"}
      </Typography>

      <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>

        <TextField
        label="Título"
        name="title"
        value={movieData.title}
        onChange={handleChange}
        fullWidth
        required />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
          label="Año de lanzamiento"
          name="year" type="number"
          value={movieData.year}
          onChange={handleChange}
          fullWidth />

          <TextField
          label="País"
          name="country"
          value={movieData.country}
          onChange={handleChange}
          fullWidth />

        </Box>

        <TextField
        label="ID del Director"
        name="director"
        type="number"
        value={movieData.director}
        onChange={handleChange}
        fullWidth
        required
        helperText="Ingresa el ID numérico del director" />

        <TextField
        label="Sinopsis"
        name="synopsis"
        value={movieData.synopsis}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3} />

        <TextField
        label="Géneros"
        name="genres"
        value={movieData.genres}
        onChange={handleChange}
        fullWidth
        helperText="Ej: Acción, Comedia, Drama" />

        <Box
        sx={{
          border: '1px dashed rgba(77, 182, 172, 0.5)',
          p: 2,
          borderRadius: 2,
          textAlign: 'center'
        }}>

          <Typography
          variant="body2"
          sx={{ color: '#4DB6AC', mb: 1 }}>
            {id ? "Subir nuevo póster (Opcional)" : "Sube el póster de la película"}
          </Typography>

          <input
          type="file"
          accept="image/*"
          name="picture"
          onChange={handleChange}
          style={{ color: '#f0f0f0' }} />
        </Box>

        <Button
          variant="contained"
          type="submit"
          size="large"
          disabled={loading}
          sx={{
            mt: 1,
            borderRadius: 8,
            background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(95deg, #4DB6AC, #7E30E1)',
            color: loading ? 'rgba(255,255,255,0.5)' : '#fff'
          }}
        >
          {loading && <CircularProgress size={20} color="inherit" sx={{ mr: 1.5 }} />}
          {id ? (loading ? "Actualizando..." : "Actualizar Película") : (loading ? "Guardando..." : "Guardar Película")}
        </Button>
      </Box>
    </Paper>
  );
}
