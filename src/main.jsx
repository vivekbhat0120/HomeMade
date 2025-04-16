import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App';
import './index.css';

// Replace ReactDOM.render() with this:
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);