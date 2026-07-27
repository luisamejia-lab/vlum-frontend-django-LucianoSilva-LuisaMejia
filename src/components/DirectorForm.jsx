import { Box, TextField, Typography, Button, Paper, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addDirector, getDirector, updateDirector } from "../services/DirectorService";
import { useSnackbar } from "./SnackbarContext";

export default function DirectorForm() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [directorData, setDirectorData] = useState({
    name: "",
    dateofbirth: "",
    country: "",
    picture: null,
  });

  useEffect(() => {
    if (id) {
      getDirector(id).then(data => {
        setDirectorData({
          name: data.name || "", dateofbirth: data.dateofbirth || "", country: data.country || "", picture: null
        });
      }).catch(error => showSnackbar("Error cargando datos del director.", "error"));
    }
  }, [id]);

  const handleChange = (e) => {
    const {
      name,
      value,
      files
    } = e.target;
    if (name === "picture") {
      setDirectorData({ ...directorData, picture: files[0] });
    } else {
      setDirectorData({ ...directorData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateDirector(id, directorData);
        showSnackbar("Director actualizado correctamente", "success");
      } else {
        await addDirector(directorData);
        showSnackbar("Director agregado correctamente", "success");
      }
      navigate("/directors");
    } catch (error) {
      showSnackbar(`Error ${id ? 'actualizando' : 'agregando'} director. Revisa los datos.`, "error");
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
        gutterBottom sx={{ fontWeight: 700, color: '#fff', mb: 3 }}>
        {id ? "Editar Director" : "Añadir Nuevo Director"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <TextField
          label="Nombre completo"
          name="name"
          value={directorData.name}
          onChange={handleChange}
          fullWidth
          required
        />

        <Box sx={{
          display: 'flex',
          gap: 2
        }}
        >
          <TextField
            label="Fecha de nacimiento"
            name="dateofbirth"
            type="date"
            value={directorData.dateofbirth}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="País"
            name="country"
            value={directorData.country}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box sx={{
          border: '1px dashed rgba(77, 182, 172, 0.5)',
          p: 2,
          borderRadius: 2,
          textAlign: 'center'
        }}>

          <Typography
            variant="body2"
            sx={{
              color: '#4DB6AC',
              mb: 1
            }}>
            {id ? "Subir nueva foto (Opcional)" : "Sube la foto del director"}
          </Typography>

          <input
            type="file"
            accept="image/*"
            name="picture"
            onChange={handleChange}
            style={{ color: '#f0f0f0' }}
          />
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
          {id ? (loading ? "Actualizando..." : "Actualizar Director") : (loading ? "Guardando..." : "Guardar Director")}
        </Button>
      </Box>
    </Paper>
  );
}
