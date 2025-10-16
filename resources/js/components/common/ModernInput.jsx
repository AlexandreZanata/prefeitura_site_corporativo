import React from 'react';
import './ModernInput.css';

const ModernInput = ({
                         id,
                         type = 'text',
                         label,
                         value,
                         onChange,
                         icon,
                         isPasswordVisible,
                         onToggleVisibility,
                         required = true,
                         error = ''
                     }) => {
    const resolvedType = type === 'password' && isPasswordVisible ? 'text' : type;
    return (
        <div className="modern-input-group">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                    {required && <span className="required-asterisk">*</span>}
                </label>
            )}
            <div className={`input-wrapper ${error ? 'error' : ''}`}>
                <input
                    id={id}
                    type={resolvedType}
                    value={value}
                    onChange={onChange}
                    required={required}
                    autoComplete={id}
                />
                {icon && (
                    <i className={`input-icon fas ${icon}`}></i>
                )}
                {type === 'password' && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={onToggleVisibility}
                        aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                        <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                )}
            </div>
            {error && <div className="input-error">{error}</div>}
        </div>
    );
};

export default ModernInput;
