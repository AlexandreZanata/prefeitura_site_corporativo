import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const Input = ({ id, type = 'text', label, placeholder, value, onChange, icon, onToggleVisibility, isPasswordVisible }) => {
    const theme = useTheme();

    const focusStyle = {
        borderColor: theme.primary,
        boxShadow: `0 0 0 0.25rem rgba(46, 125, 50, 0.25)`,
    };

    return (
        <div className="mb-3 position-relative">
            <label htmlFor={id} className="form-label fw-bold" style={{ color: theme.text }}>
                {label}
            </label>

            <div className="position-relative">
                {icon && <i className={`fas ${icon} position-absolute`} style={{ top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#ccc' }}></i>}

                <input
                    type={type}
                    className="form-control form-control-lg"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{
                        borderRadius: '12px',
                        paddingLeft: icon ? '40px' : '15px',
                        paddingRight: type === 'password' ? '40px' : '15px',
                        height: '50px'
                    }}
                    onFocus={e => {
                        e.target.style.borderColor = focusStyle.borderColor;
                        e.target.style.boxShadow = focusStyle.boxShadow;
                    }}
                    onBlur={e => {
                        e.target.style.borderColor = '#dee2e6';
                        e.target.style.boxShadow = 'none';
                    }}
                    required
                />

                {/* Ícone do "olho" para senhas */}
                {onToggleVisibility && (
                    <span
                        onClick={onToggleVisibility}
                        className="position-absolute"
                        style={{
                            top: '50%',
                            right: '15px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#888'
                        }}
                    >
                        <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
