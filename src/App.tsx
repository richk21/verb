import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app/AppRoutes';
import { darkTheme, lightTheme } from './app/theme';
import { GlobalAlertToast } from './components/AlertToast/GlobalAlertToast';
import { Navbar } from './components/Navbar/Navbar';
import { NotificationActions } from './redux/notification/notificationActions';

export function App() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(NotificationActions.getNotifications({ page: 1 }));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <GlobalAlertToast />
        <Box sx={{ paddingTop: '70px' }}>
          <AppRoutes />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
