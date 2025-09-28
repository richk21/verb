import { Routes, Route } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Signup } from '../components/Signup/Signup';
import { LoginAndSignUp } from '../pages/LoginAndSignupPage/LoginAndSignUp';
import { Home } from '../pages/Home/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<LoginAndSignUp />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
