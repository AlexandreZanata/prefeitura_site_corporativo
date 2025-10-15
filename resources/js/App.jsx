import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import './styles/main.css';

function App() {
    return (
        <ThemeProvider>
            {/* Aqui entrariam Header, Footer, etc. */}
            <main>
                <HomePage />
            </main>
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
