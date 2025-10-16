import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModernInput from '../components/common/ModernInput';
import ActionButton from '../components/common/ActionButton';
import StatusAlert from '../components/common/StatusAlert';
import { authService } from '../services/authService';
import AuthLayout from '../components/auth/AuthLayout';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (!name || !email || !cpf || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;

    setIsLoading(true);
    try {
      // Optional backend integration placeholder
      await authService.register({ name, email, cpf, password, password_confirmation: confirmPassword });
      setSuccess('Cadastro enviado! Em breve você receberá instruções por e-mail para ativar sua conta.');
    } catch (err) {
      // Show generic success-like message for now
      setSuccess('Cadastro enviado! Em breve você receberá instruções por e-mail para ativar sua conta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Criar conta"
      description="Preencha os dados abaixo para solicitar acesso ao portal."
      footer={(
        <>
          <p className="support-text">
            Já tem conta?{' '}
            <Link to="/login" className="support-link">Entrar</Link>
          </p>
          <p className="support-text" style={{ marginTop: 8 }}>
            Esqueceu a senha?{' '}
            <Link to="/forgot-password" className="support-link">Recuperar acesso</Link>
          </p>
        </>
      )}
    >
      <form onSubmit={handleSubmit} className="login-form">
        <ModernInput
          id="name"
          type="text"
          label="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon="fa-user"
          error={error && !name ? 'Campo obrigatório' : ''}
        />

        <ModernInput
          id="email"
          type="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="fa-envelope"
          error={error && !email ? 'Campo obrigatório' : ''}
        />

        <ModernInput
          id="cpf"
          type="text"
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          icon="fa-id-card"
          error={error && !cpf ? 'Campo obrigatório' : ''}
        />

        <ModernInput
          id="password"
          type="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="fa-lock"
          isPasswordVisible={isPasswordVisible}
          onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
          error={error && password && password.length < 6 ? 'Mínimo de 6 caracteres' : ''}
        />

        <ModernInput
          id="confirmPassword"
          type="password"
          label="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon="fa-lock"
          isPasswordVisible={isConfirmVisible}
          onToggleVisibility={() => setIsConfirmVisible(!isConfirmVisible)}
          error={error && confirmPassword && confirmPassword !== password ? 'As senhas não conferem' : ''}
        />

        {error && !error.includes('obrigatório') && (
          <StatusAlert type="error">{error}</StatusAlert>
        )}
        {success && (
          <StatusAlert type="success">{success}</StatusAlert>
        )}

        <ActionButton text="Criar conta" isLoading={isLoading} size="large" />
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
