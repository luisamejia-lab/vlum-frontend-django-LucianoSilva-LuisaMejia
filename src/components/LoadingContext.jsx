import { createContext, useState, useContext } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setIsLoading }}>
            {children}
            <Backdrop
                sx={{
                    color: '#4DB6AC',
                    zIndex: (theme) => theme.zIndex.modal + 999,
                    backdropFilter: 'blur(4px)'
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" size={60} thickness={4} />
            </Backdrop>
        </LoadingContext.Provider>
    );
};
