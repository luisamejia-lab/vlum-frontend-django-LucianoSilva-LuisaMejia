import { Card, CardContent, CardActions, Skeleton } from "@mui/material";

export default function CardSkeleton() {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                background: 'rgba(20, 10, 40, 0.55)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(126, 48, 225, 0.3)'
            }}
        >
            <Skeleton
                variant="rectangular"
                height={320}
                animation="wave"
                sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
            />

            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Skeleton
                    variant="text"
                    width="80%"
                    height={32}
                    animation="wave"
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)', mb: 1 }}
                />
                <Skeleton
                    variant="text"
                    width="40%"
                    height={20}
                    animation="wave"
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                />
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Skeleton
                    variant="rounded"
                    width={80}
                    height={30}
                    animation="wave"
                    sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.08)' }}
                />
            </CardActions>
        </Card>
    );
}
