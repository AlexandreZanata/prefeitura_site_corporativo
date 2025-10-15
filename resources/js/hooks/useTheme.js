import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        return {
            primary: '#1e3a8a',     // Azul marinho profissional
            secondary: '#0f766e',   // Verde água profissional
            accent: '#dc2626',      // Vermelho corporativo
            dark: '#1f2937',        // Cinza escuro
            light: '#f8fafc',       // Cinza muito claro
            text: '#111827',        // Texto escuro
            textLight: '#6b7280',   // Texto claro
            white: '#ffffff',
            success: '#059669',     // Verde sucesso
            warning: '#d97706',     // Amarelo alerta
            error: '#dc2626'        // Vermelho erro
        };
    }
    return context;
};
