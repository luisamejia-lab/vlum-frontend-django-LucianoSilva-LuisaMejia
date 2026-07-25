import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addDirector, getDirector, updateDirector } from "../services/DirectorService";

export default function DirectorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");
  const [directorData, setDirectorData] = useState({
    name: "", dateofbirth: "", country: "", picture: null,
  });

  useEffect(() => {
    if (id) {
      getDirector(id).then(data => {
        setDirectorData({
          name: data.name || "",
          dateofbirth: data.dateofbirth || "",
          country: data.country || "",
          picture: null
        });
      }).catch(err => setError("Error cargando datos del director."));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setDirectorData({ ...directorData, picture: files[0] });
    } else {
      setDirectorData({ ...directorData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateDirector(id, directorData);
        alert("Director actualizado correctamente");
      } else {
        await addDirector(directorData);
        alert("Director agregado correctamente");
      }
      navigate("/directors");
    } catch (error) {
      setError(`Error ${id ? 'actualizando' : 'agregando'} director. Por favor intenta nuevamente.`);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 600, mx: 'auto', mt: 4, p: 4, borderRadius: 4, background: 'rgba(20, 10, 40, 0.65)',
        backdropFilter: 'blur(12px)', border: '1px solid rgba(126, 48, 225, 0.3)', boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#fff', mb: 3 }}>
        {id ? "Editar Director" : "Añadir Nuevo Director"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Nombre completo" name="name" value={directorData.name} onChange={handleChange} fullWidth required />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="Fecha de nacimiento" name="dateofbirth" type="date" value={directorData.dateofbirth} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="País" name="country" value={directorData.country} onChange={handleChange} fullWidth />
        </Box>

        {errorMsg && <Typography color="error" align="center">{errorMsg}</Typography>}

        <Box sx={{ border: '1px dashed rgba(77, 182, 172, 0.5)', p: 2, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#4DB6AC', mb: 1 }}>{id ? "Subir nueva foto (Opcional)" : "Sube la foto del director"}</Typography>
          <input type="file" accept="image/*" name="picture" onChange={handleChange} style={{ color: '#f0f0f0' }} />
        </Box>

        <Button variant="contained" type="submit" size="large" sx={{ mt: 1, borderRadius: 8, background: 'linear-gradient(95deg, #4DB6AC, #7E30E1)' }}>
          {id ? "Actualizar Director" : "Guardar Director"}
        </Button>
      </Box>
    </Paper>
  );
}
