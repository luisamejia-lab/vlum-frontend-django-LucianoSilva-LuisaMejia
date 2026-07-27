import { Grid, Typography, Box } from "@mui/material";
import DirectorCard from "../components/DirectorCard";
import CardSkeleton from "../components/CardSkeleton";
import { useState, useEffect } from "react";
import { getDirectorList } from "../services/DirectorService";

export default function DirectorList() {
    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDirectorList()
            .then((directorData) => {
                setDirectors(Array.isArray(directorData) ? directorData : []);
            })
            .catch((error) => {
                console.error("Error obteniendo lista de directores:", error);
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
                    background: 'linear-gradient(120deg, #fff, #4DB6AC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    borderBottom: '3px solid transparent',
                    borderImage: 'linear-gradient(90deg, #7E30E1, #C2185B, #4DB6AC) 1'
                }}
            >
                Directores Destacados
            </Typography>

            <Grid container spacing={3}>
                {loading
                    ? Array.from(new Array(8)).map((_, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <CardSkeleton />
                        </Grid>
                    ))
                    : directors.map((director) => (
                        <Grid item key={director.id} xs={12} sm={6} md={4} lg={3}>
                            <DirectorCard director={director} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}
