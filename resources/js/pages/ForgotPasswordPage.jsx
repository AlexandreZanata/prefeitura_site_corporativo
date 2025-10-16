import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModernInput from '../components/common/ModernInput';
import ActionButton from '../components/common/ActionButton';
import { authService } from '../services/authService';
import AuthLayout from '../components/auth/AuthLayout';

const ForgotPasswordPage = () => {
  const [credential, setCredential] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!credential) {
      setError('Por favor, informe seu e-mail ou CPF.');
      return;
    }

    setIsLoading(true);
    try {
      // Optional backend integration; if not available yet, this will simply error and we show a friendly message.
      await authService.requestPasswordReset({ credential });
      setSuccess('Se encontrarmos sua conta, enviaremos instruções de redefinição de senha para o e-mail cadastrado.');
    } catch (err) {
      // Show a generic success-like flow to avoid leaking account existence
      setSuccess('Se encontrarmos sua conta, enviaremos instruções de redefinição de senha para o e-mail cadastrado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Esqueci minha senha"
      description="Informe seu e-mail ou CPF para receber as instruções de redefinição de senha."
      footer={(
        <>
          <p className="support-text">
            Lembrou a senha?{' '}
            <Link to="/login" className="support-link">Voltar ao login</Link>
          </p>
          <p className="support-text" style={{ marginTop: 8 }}>
            Não tem conta?{' '}
            <Link to="/register" className="support-link">Criar conta</Link>
          </p>
        </>
      )}
    >
      <form onSubmit={handleSubmit} className="login-form">
        <ModernInput
          id="credential"
          type="text"
          label="CPF ou E-mail"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          icon="fa-user"
          error={error && !credential ? 'Campo obrigatório' : ''}
        />

        {error && !error.includes('obrigatório') && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" style={{ color: '#065f46', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem' }}>
            <i className="fas fa-check-circle" style={{ marginRight: 8 }}></i>
            {success}
          </div>
        )}

        <ActionButton text="Enviar instruções" isLoading={isLoading} size="large" />
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
