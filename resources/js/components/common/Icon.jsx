import React from 'react';

/**
 * Componente para renderizar ícones de forma simplificada,
 * assumindo o uso de uma biblioteca como Font Awesome.
 *
 * @param {object} props - As propriedades do componente.
 * @param {string} props.name - O nome do ícone (ex: 'fa-file-invoice-dollar').
 * @param {'xs' | 'sm' | 'lg' | '2x' | '3x' | '5x' | '10x'} [props.size] - O tamanho do ícone.
 * @param {string} [props.className=''] - Classes CSS adicionais.
 * @returns {JSX.Element} O elemento <i> do ícone.
 */
const Icon = ({ name, size, className = '' }) => {
    // Monta a string de classes dinamicamente
    // Ex: "fas fa-file-invoice-dollar fa-2x custom-class"
    const iconClasses = `fas ${name} ${size ? `fa-${size}` : ''} ${className}`.trim();

    return <i className={iconClasses}></i>;
};

export default Icon;
