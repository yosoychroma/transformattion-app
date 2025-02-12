import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { getTheme } from './config/theme';
import GlobalStyles from './assets/styles/globalStyles';
import { useThemeMode } from './hooks/useThemeMode';

const Root = () => {
  const [themeMode, toggleTheme] = useThemeMode();
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
); 