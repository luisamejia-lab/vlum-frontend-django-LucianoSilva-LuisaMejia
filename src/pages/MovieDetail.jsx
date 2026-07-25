import { Box, Typography, Button, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovie } from "../services/MovieService";

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    useEffect(() => {
        getMovie(id).then(setMovie).catch(console.error);
    }, [id]);

    if (!movie) return <Typography align="center" sx={{ mt: 10 }}>Cargando película...</Typography>;

    return (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 900, width: '100%', p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4,
                    borderRadius: 4, background: 'rgba(20, 10, 40, 0.65)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(126, 48, 225, 0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
            >
                <Box
                    component="img"
                    src={`${mediaUrl}/${movie.picture}`}
                    alt={movie.title}
                    sx={{ width: { xs: '100%', md: 350 }, height: 500, objectFit: 'cover', borderRadius: 2, boxShadow: '0 10px 20px rgba(0,0,0,0.6)' }}
                />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #FFF, #C2185B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
                        {movie.title} <Typography component="span" variant="h4" sx={{ color: '#4DB6AC' }}>({movie.year})</Typography>
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#FFAB91', mb: 3 }}>
                        Director ID: {movie.director} | {movie.country}
                    </Typography>

                    <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Typography sx={{ background: 'linear-gradient(110deg, #C2185B, #8e1a4b)', px: 2, py: 0.5, borderRadius: 5, fontSize: '0.9rem', fontWeight: 600 }}>
                            {movie.genres}
                        </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ color: '#4DB6AC', mb: 1, fontWeight: 700 }}>Sinopsis</Typography>
                    <Typography sx={{ color: '#e0e0e0', lineHeight: 1.8, mb: 'auto' }}>
                        {movie.synopsis}
                    </Typography>

                    <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 4, alignSelf: 'flex-start', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', borderRadius: 5 }}>
                        ← Volver
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
