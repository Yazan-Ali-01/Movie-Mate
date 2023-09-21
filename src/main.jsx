import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './app/store.js';
import './index.css';
import ToggleColorModeProvider from './utils/ToggleColorMode.jsx';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ToggleColorModeProvider>,
  </Provider>,
);
