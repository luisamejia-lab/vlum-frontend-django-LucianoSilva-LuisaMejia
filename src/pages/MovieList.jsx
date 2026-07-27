import { Grid, Typography, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import CardSkeleton from "../components/CardSkeleton";
import { useState, useEffect } from "react";
import { getMovieList } from "../services/MovieService";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovieList()
            .then((moviesData) => {
                setMovies(Array.isArray(moviesData) ? moviesData : []);
            })
            .catch((error) => {
                console.error("Error obteniendo lista de peliculas:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Box sx={{ mt: 2 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 4,
                    pb: 1,
                    background: 'linear-gradient(120deg, #fff, #C2185B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    borderBottom: '3px solid transparent',
                    borderImage: 'linear-gradient(90deg, #7E30E1, #C2185B, #4DB6AC) 1'
                }}
            >
                Películas Destacadas
            </Typography>

            <Grid container spacing={3}>
                {loading
                    ? Array.from(new Array(8)).map((_, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <CardSkeleton />
                        </Grid>
                    ))
                    : movies.map((movie) => (
                        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}
