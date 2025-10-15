import React from 'react';
import Card from '../common/Card';
import Icon from '../common/Icon';
import { useTheme } from '../../hooks/useTheme';

const ServiceCard = ({ icon, title, text, link }) => {
    const theme = useTheme();

    const iconStyle = {
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
        boxShadow: `0 6px 15px -5px ${theme.primary}`,
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        borderColor: theme.primary,
        color: theme.primary,
        fontWeight: 500,
        transition: 'all 0.3s ease',
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.backgroundColor = theme.primary;
        e.currentTarget.style.color = 'white';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = theme.primary;
    };

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <Card className="text-center p-4">
                <div
                    className="icon-circle text-white mb-4 d-inline-flex align-items-center justify-content-center"
                    style={iconStyle}
                >
                    <Icon name={icon} size="2x" />
                </div>
                <h5 className="card-title fw-bold mb-3">{title}</h5>
                <p className="card-text text-secondary">{text}</p>
                <a
                    href={link}
                    className="btn rounded-pill mt-auto"
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Acessar Agora
                </a>
            </Card>
        </div>
    );
};


export default ServiceCard;
