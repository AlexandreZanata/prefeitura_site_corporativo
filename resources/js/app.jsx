import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage.jsx';

const rootElement = document.getElementById('home-page-react');
if (rootElement) {
    createRoot(rootElement).render(<HomePage />);
}


