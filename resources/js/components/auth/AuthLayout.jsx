import React from 'react';
import './AuthLayout.css';

/**
 * AuthLayout
 * Shared split layout used by Login, Register and Forgot Password pages.
 * Ensures identical structure, paddings and margins across all auth pages.
 */
export default function AuthLayout({
  title,
  description,
  children,
  footer,
}) {
  return (
    <div className="split-login">
      {/* Left - Branding */}
      <div className="login-side">
        <div className="brand-section">
          <div className="brand-content">
            <img
              src="https://www.sorriso.mt.gov.br/storage/settings/October2023/yQd6d7xGfEdX9G872Tz8.png"
              alt="Brasão de Sorriso"
              className="brand-logo"
            />
            <h1 className="brand-title">
              Prefeitura Municipal<br />
              <span className="brand-city">de Sorriso</span>
            </h1>
            <p className="brand-subtitle">Portal do Servidor</p>

            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-shield-alt"></i>
                <div className="feature-text">
                  <strong>Acesso Seguro</strong>
                  <span>Autenticação protegida</span>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-briefcase"></i>
                <div className="feature-text">
                  <strong>Gestão Corporativa</strong>
                  <span>Ferramentas profissionais</span>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-clock"></i>
                <div className="feature-text">
                  <strong>Disponível 24/7</strong>
                  <span>Acesso a qualquer hora</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form wrapper */}
      <div className="form-side">
        {/* Mobile header */}
        <div className="mobile-header">
          <img
            src="https://www.sorriso.mt.gov.br/storage/settings/October2023/yQd6d7xGfEdX9G872Tz8.png"
            alt="Brasão de Sorriso"
            className="mobile-logo"
          />
          <div className="mobile-brand">
            <h2>Prefeitura de Sorriso</h2>
            <p>Portal do Servidor</p>
          </div>
        </div>

        <div className="form-content">
          {(title || description) && (
            <div className="form-intro">
              {title && <h1 className="form-title">{title}</h1>}
              {description && (
                <p className="form-description">{description}</p>
              )}
            </div>
          )}

          {children}

          {footer && (
            <div className="login-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
