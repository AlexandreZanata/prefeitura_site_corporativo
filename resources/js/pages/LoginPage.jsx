import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import ModernInput from '../components/common/ModernInput';
import ActionButton from '../components/common/ActionButton';
import './LoginPage.css';

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
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (password === "123456") {
                console.log('Login bem-sucedido!', { rememberMe });
                window.location.href = '/home';
            } else {
                setError('Credenciais inválidas. Verifique seu CPF/Email e senha.');
            }
        } catch (err) {
            setError('Erro de conexão. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="split-login">
            {/* Lado Esquerdo - Branding com Fundo Azul */}
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

            {/* Lado Direito - Formulário de Login */}
            <div className="form-side">
                {/* Mobile Header */}
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

                {/* Conteúdo do Formulário */}
                <div className="form-content">
                    <div className="form-intro">
                        <h1 className="form-title">Acesso ao Sistema</h1>
                        <p className="form-description">
                            Entre com suas credenciais para acessar o portal corporativo
                        </p>
                    </div>

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
                            <div className="error-message">
                                <i className="fas fa-exclamation-triangle"></i>
                                {error}
                            </div>
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
                            <a href="#" className="forgot-password">
                                Esqueceu a senha?
                            </a>
                        </div>

                        <ActionButton
                            text="Entrar no Sistema"
                            isLoading={isLoading}
                            size="large"
                        />

                        <div className="login-footer">
                            <p className="support-text">
                                Problemas com acesso?{' '}
                                <a href="#" className="support-link">
                                    Contatar suporte
                                </a>
                            </p>
                            <div className="security-notice">
                                <i className="fas fa-lock"></i>
                                <span>Conexão segura SSL</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
