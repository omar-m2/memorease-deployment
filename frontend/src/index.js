import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create root element for rendering the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application within the BrowserRouter for routing capabilities
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
