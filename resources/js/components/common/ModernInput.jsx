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
    return (
        <div className="modern-input-group">
            <div className={`input-wrapper ${error ? 'error' : ''} ${value ? 'has-value' : ''}`}>
                <input
                    id={id}
                    type={type === 'password' && isPasswordVisible ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder=" "
                />
                <label htmlFor={id} className="input-label">
                    {label}
                    {required && <span className="required-asterisk">*</span>}
                </label>
                {icon && (
                    <i className={`input-icon fas ${icon}`}></i>
                )}
                {type === 'password' && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={onToggleVisibility}
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
