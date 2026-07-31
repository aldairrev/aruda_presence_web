import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import PresenceDashboard from './components/PresenceDashboard';

const rootElement = document.getElementById('app');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <PresenceDashboard />
        </React.StrictMode>
    );
}
