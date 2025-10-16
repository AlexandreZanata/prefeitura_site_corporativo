import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import router components
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './routes/PrivateRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import './styles/main.css';

function App() {
    // This effect to hide a loader is good, we can keep it.
    useEffect(() => {
        const loader = document.getElementById('loader-wrapper');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, []);

    return (
        <ThemeProvider>
            {/* BrowserRouter manages the app's routing history */}
            <BrowserRouter>
                {/* Routes is a container for all the individual routes */}
                <Routes>
                    {/* When the URL is "/", render the HomePage component (public) */}
                    <Route path="/" element={<HomePage />} />

                    {/* When the URL is "/login", render the LoginPage component */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* New pages for account actions */}
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Public informational pages */}
                    <Route path="/contato" element={<ContactPage />} />

                    {/* You can add more routes for other pages here in the future */}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
