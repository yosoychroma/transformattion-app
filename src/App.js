import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './assets/styles/globalStyles';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import './i18n/i18n';
import ThemeToggle from './components/common/ThemeToggle/ThemeToggle';
import LiveChat from './components/LiveChat/LiveChat';
import { useTheme } from 'styled-components';

function App({ toggleTheme }) {
  const theme = useTheme();
  const isDark = theme.colors.background.primary === '#1a202c';

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Home />
        <ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
        <LiveChat />
      </Layout>
    </ThemeProvider>
  );
}

export default App; 