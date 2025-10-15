import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    return theme;
};
