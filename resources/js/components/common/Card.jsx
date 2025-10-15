import React from 'react';

/**
 * Componente Card genérico e reutilizável.
 * Fornece um contêiner com estilo padrão, incluindo sombra, bordas arredondadas
 * e um efeito de "levantar" no hover.
 *
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os elementos filhos a serem renderizados dentro do card.
 * @param {string} [props.className=''] - Classes CSS adicionais para customização.
 * @returns {JSX.Element} O componente do card renderizado.
 */
const Card = ({ children, className = '' }) => {
    // Estilos inline para facilitar a demonstração e o controle dinâmico
    const cardStyle = {
        backgroundColor: '#FFFFFF',
        border: '1px solid #eef2f7', // Borda muito sutil
        borderRadius: '16px', // Bordas mais arredondadas para um look moderno
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)', // Sombra mais suave
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        height: '100%',
    };

    // Função para manipular o efeito de hover
    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.05)';
    };

    return (
        <div
            className={`card border-0 ${className}`}
            style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};

export default Card;
