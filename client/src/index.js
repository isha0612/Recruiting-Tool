import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './Context/userContext';
import { DarkModeProvider } from './Context/darkModeContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </UserProvider>
  </React.StrictMode>
);

