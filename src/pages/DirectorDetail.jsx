import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDirector } from "../services/DirectorService";
import { getMoviesByDirector } from "../services/MovieService";
import MovieCard from "../components/MovieCard";

export default function DirectorDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [director, setDirector] = useState(null);
    const [movies, setMovies] = useState([]);
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    useEffect(() => {
        getDirector(id).then(setDirector).catch(console.error);
        getMoviesByDirector(id).then(data => setMovies(Array.isArray(data) ? data : [])).catch(console.error);
    }, [id]);

    if (!director) return <Typography align="center" sx={{ mt: 10 }}>Cargando director...</Typography>;

    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
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
                        src={`${mediaUrl}/${director.picture}`}
                        alt={director.name}
                        sx={{ width: { xs: '100%', md: 300 }, height: 400, objectFit: 'cover', borderRadius: 2, border: '2px solid rgba(77, 182, 172, 0.3)' }}
                    />
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h3" sx={{ fontWeight: 800, background: 'linear-gradient(120deg, #fff, #4DB6AC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 2 }}>
                            {director.name}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#FFAB91', mb: 1 }}>Nacimiento: {director.dateofbirth}</Typography>
                        <Typography variant="h6" sx={{ color: '#e0e0e0', mb: 3 }}>País: {director.country}</Typography>

                        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 'auto', alignSelf: 'flex-start', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', borderRadius: 5 }}>
                            ← Volver
                        </Button>
                    </Box>
                </Paper>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#fff', borderBottom: '2px solid #4DB6AC', pb: 1, display: 'inline-block' }}>
                Películas de {director.name}
            </Typography>

            {movies.length > 0 ? (
                <Grid container spacing={3}>
                    {movies.map((movie) => (
                        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography sx={{ color: '#FFAB91', fontStyle: 'italic', background: 'rgba(0,0,0,0.4)', p: 2, borderRadius: 2, display: 'inline-block' }}>
                    No hay películas registradas para este director.
                </Typography>
            )}
        </Box>
    );
}
