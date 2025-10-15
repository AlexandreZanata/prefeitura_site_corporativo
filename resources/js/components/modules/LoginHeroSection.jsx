import React from 'react';

const LoginHeroSection = ({ title = 'Bem-vindo de volta', subtitle = 'Acesse sua conta para continuar', imageUrl }) => {
    const heroStyle = {
        backgroundImage: `linear-gradient(90deg, rgba(6,78,59,0.85), rgba(6,78,59,0.6)), url(${imageUrl || ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        color: 'white',
        borderRadius: '12px',
    };

    return (
        <div style={heroStyle} className="mb-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                        <h1 className="display-5 fw-bold" style={{ color: 'white' }}>{title}</h1>
                        <p className="lead" style={{ color: 'rgba(255,255,255,0.9)' }}>{subtitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

