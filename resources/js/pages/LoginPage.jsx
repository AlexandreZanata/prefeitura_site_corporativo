import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import ModernInput from '../components/common/ModernInput';
import ActionButton from '../components/common/ActionButton';
import StatusAlert from '../components/common/StatusAlert';
import { authService } from '../services/authService';
import AuthLayout from '../components/auth/AuthLayout';

const LoginPage = () => {
    const theme = useTheme();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!credential || !password) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await authService.login({ credential, password, remember: rememberMe });
            // Optional: result.user is available if returned by backend
            window.location.href = '/home';
        } catch (err) {
            const message = err?.response?.data?.message || 'Erro de conexão. Tente novamente.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Acesso ao Sistema"
            description="Entre com suas credenciais para acessar o portal corporativo"
            footer={(
                <>
                    <p className="support-text">
                        Novo por aqui?{' '}
                        <Link to="/register" className="support-link">
                            Criar conta
                        </Link>
                    </p>
                    <div className="security-notice">
                        <i className="fas fa-lock"></i>
                        <span>Conexão segura SSL</span>
                    </div>
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

                <ModernInput
                    id="password"
                    type="password"
                    label="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon="fa-lock"
                    isPasswordVisible={isPasswordVisible}
                    onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
                    error={error && !password ? 'Campo obrigatório' : ''}
                />

                {error && !error.includes('obrigatório') && (
                    <StatusAlert type="error">{error}</StatusAlert>
                )}

                <div className="form-options">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Manter conectado
                    </label>
                    <Link to="/forgot-password" className="forgot-password">
                        Esqueceu a senha?
                    </Link>
                </div>

                <ActionButton
                    text="Entrar no Sistema"
                    isLoading={isLoading}
                    size="large"
                />
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
