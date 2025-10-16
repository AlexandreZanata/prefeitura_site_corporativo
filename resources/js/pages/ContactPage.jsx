import React, { useState } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import ModernInput from '../components/common/ModernInput';
import ActionButton from '../components/common/ActionButton';
import StatusAlert from '../components/common/StatusAlert';
import './ContactPage.css';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (!name || !email || !subject || !message) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Simple e-mail validation pattern
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(email)) {
      setError('Informe um e-mail válido.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      // Placeholder for future backend integration
      // Example: await api.post('/contato', { name, email, subject, message })
      await new Promise((res) => setTimeout(res, 800));
      setSuccess('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Fale Conosco"
      description="Envie uma mensagem para a equipe da Prefeitura de Sorriso"
      footer={(
        <p className="support-text">
          Precisa de ajuda imediata? Envie um e-mail para suporte@sorriso.mt.gov.br
        </p>
      )}
    >
      <form onSubmit={onSubmit} className="contact-form">
        <div className="form-grid">
          <ModernInput
            id="name"
            type="text"
            label="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon="fa-user"
            error={error && !name ? 'Campo obrigatório' : ''}
          />

          <ModernInput
            id="email"
            type="email"
            label="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="fa-envelope"
            error={error && (!email || (email && !/.+@.+\..+/.test(email))) ? 'Informe um e-mail válido' : ''}
          />
        </div>

        <ModernInput
          id="subject"
          type="text"
          label="Assunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          icon="fa-tag"
          error={error && !subject ? 'Campo obrigatório' : ''}
        />

        <div className="modern-textarea">
          <label htmlFor="message">Mensagem</label>
          <div className="textarea-wrapper">
            <i className="fas fa-comment-dots"></i>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Descreva sua solicitação ou mensagem"
              rows={5}
            />
          </div>
          {error && !message && <span className="input-error">Campo obrigatório</span>}
        </div>

        {error && !error.includes('obrigatório') && (
          <StatusAlert type="error">{error}</StatusAlert>
        )}

        {success && (
          <StatusAlert type="success">{success}</StatusAlert>
        )}

        <ActionButton text="Enviar Mensagem" isLoading={isLoading} size="large" />
      </form>
    </AuthLayout>
  );
};

export default ContactPage;
