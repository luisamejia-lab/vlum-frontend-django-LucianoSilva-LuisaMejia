import { Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { isLoggedIn } from "../services/authService";
import { deleteDirector } from "../services/DirectorService";

export default function DirectorCard({ director }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al director "${director.name}"?`)) {
      try {
        await deleteDirector(director.id);
        window.location.reload();
      } catch (error) {
        alert("Error al eliminar el director.");
      }
    }
  };

  return (
    <Card
      sx={{
        height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4, background: 'rgba(20, 10, 40, 0.55)',
        backdropFilter: 'blur(12px)', border: '1px solid rgba(126, 48, 225, 0.3)', transition: 'all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
        '&:hover': { transform: 'translateY(-8px) scale(1.02)', borderColor: '#4DB6AC', boxShadow: '0 20px 30px -10px rgba(77, 182, 172, 0.4)' }
      }}
    >
      <CardMedia component="img" image={`${mediaUrl}/${director.picture}`} alt={director.name} sx={{ height: 320, objectFit: 'cover' }} />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700, color: '#fff' }}>{director.name}</Typography>
        <Typography variant="body2" sx={{ color: '#FFAB91', fontWeight: 600 }}>{director.country || "Director"}</Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, display: 'flex', alignItems: 'center' }}>
        <Button size="small" component={Link} to={`/directors/${director.id}`} sx={{ color: '#4DB6AC', fontWeight: 600 }}>Ver Más</Button>

        {isLoggedIn() && (
          <Box sx={{ ml: 'auto' }}>
            <IconButton component={Link} to={`/edit-director/${director.id}`} size="small" sx={{ color: '#4DB6AC' }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleDelete} size="small" sx={{ color: '#C2185B' }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}
