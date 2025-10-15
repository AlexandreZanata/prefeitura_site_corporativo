import React from 'react';
import Card from '../common/Card';
import { useTheme } from '../../hooks/useTheme';

const NewsCard = ({ image, title, text, category }) => {
    const theme = useTheme();

    const categoryStyle = {
        backgroundColor: theme.accent,
        color: theme.text,
        fontWeight: 'bold',
        fontSize: '0.8rem',
        position: 'absolute',
        top: '15px',
        left: '15px',
        padding: '5px 10px',
        borderRadius: '50px',
    };

    return (
        <div className="col-md-4 mb-4">
            <Card className="p-0 overflow-hidden">
                <div className="position-relative">
                    <img src={image} className="card-img-top" alt={title} style={{ height: '220px', objectFit: 'cover' }} />
                    <div style={categoryStyle}>{category}</div>
                </div>
                <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-3" style={{ minHeight: '50px' }}>{title}</h5>
                    <p className="card-text text-secondary">{text}</p>
                    <a href="#" style={{ color: theme.primary, textDecoration: 'none', fontWeight: 'bold' }}>
                        Leia mais <i className="fas fa-arrow-right ms-1"></i>
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default NewsCard;
