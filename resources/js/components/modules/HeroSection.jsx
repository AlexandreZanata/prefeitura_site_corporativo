import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const HeroSection = ({ title, subtitle, imageUrl }) => {
    const theme = useTheme();

    const heroStyle = {
        backgroundImage: `
            linear-gradient(to right, ${theme.primary} 30%, rgba(46, 125, 50, 0.7)),
            url(${imageUrl})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        color: 'white',
        clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)', // Efeito de corte diagonal
    };

    return (
        <div style={heroStyle}>
            <div className="container text-left">
                <h1 className="display-3 fw-bold" style={{ color: 'white' }}>{title}</h1>
                <p className="lead col-lg-6">{subtitle}</p>
                <a href="#servicos" className="btn btn-lg mt-3" style={{ backgroundColor: theme.accent, color: theme.text, fontWeight: 'bold' }}>
                    Nossos Serviços
                </a>
            </div>
        </div>
    );
};

export default HeroSection;
