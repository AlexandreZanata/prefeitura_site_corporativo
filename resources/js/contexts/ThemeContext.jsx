import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

// Cores baseadas no seu JSON
const themes = {
    default: {
        primary: '#2E7D32', // primary_agro_green
        accent: '#F4C542',  // accent_sun_yellow
        background: '#F5F5F5',
        text: '#0B3D2E',
    },
    // Futuros temas podem ser adicionados aqui
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.default);

    // Aqui você pode adicionar lógica para buscar o tema do admin via API

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
