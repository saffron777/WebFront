import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Elimina StrictMode
  <App />
);

// Si deseas medir el rendimiento, puedes pasar una función para los resultados
reportWebVitals();
