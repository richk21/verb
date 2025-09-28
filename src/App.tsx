import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './app/AppRoutes';
import { darkTheme, lightTheme } from './app/theme';
import { Navbar } from './components/Navbar/Navbar';
import { resetAuthToken, resetUser, setAuthToken, setUser } from './redux/user/userSlice';

export function App() {
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      dispatch(setAuthToken(token));
      try {
        const decodedUser = jwtDecode<{ name: string; email: string }>(token);
        console.log(decodedUser);
        dispatch(setUser({ name: decodedUser.name, email: decodedUser.email }));
      } catch {
        Cookies.remove('authToken');
        dispatch(resetUser());
        dispatch(resetAuthToken());
      }
    }
  }, [dispatch]);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
