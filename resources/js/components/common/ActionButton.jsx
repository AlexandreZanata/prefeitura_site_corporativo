import React from 'react';
import './ActionButton.css';

const ActionButton = ({
                          type = 'submit',
                          text,
                          isLoading,
                          disabled,
                          variant = 'primary',
                          size = 'medium',
                          fullWidth = true
                      }) => {
    return (
        <button
            type={type}
            className={`action-button ${variant} ${size} ${fullWidth ? 'full-width' : ''}`}
            disabled={disabled || isLoading}
        >
            <span className="button-content">
                {isLoading ? (
                    <>
                        <i className="fas fa-circle-notch fa-spin"></i>
                        Processando...
                    </>
                ) : (
                    text
                )}
            </span>
        </button>
    );
};

export default ActionButton;
