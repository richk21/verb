import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import { useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './app/AppRoutes';
import { darkTheme, lightTheme } from './app/theme';
import { Navbar } from './components/Navbar/Navbar';

export function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('verb_theme');
    if (!saved) {
      localStorage.setItem('verb_theme', 'l');
      return false;
    }
    return saved === 'd';
  });

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem('verb_theme', newTheme ? 'd' : 'l');
      return newTheme;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <Box sx={{ paddingTop: '70px' }}>
          <AppRoutes />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
