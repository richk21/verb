import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app/AppRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { resetAuthToken, resetUser, setAuthToken, setUser } from './redux/user/userSlice';
import { jwtDecode } from 'jwt-decode';
import { Navbar } from './components/Navbar/Navbar';

export function App() {
  const dispatch = useDispatch();

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

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}
