import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { appTheme } from './theme.js';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={appTheme} defaultColorScheme="dark" forceColorScheme="dark">
      <Notifications position="top-center" zIndex={4000} />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
