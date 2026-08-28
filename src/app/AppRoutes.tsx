import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Signup } from '../components/Signup/Signup';
import { CreateOrEditReport } from '../pages/CreateReport/CreateReport';
import { Home } from '../pages/Home/Home';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { LoginAndSignUp } from '../pages/LoginAndSignupPage/LoginAndSignUp';
import { PasswordReset } from '../pages/PasswordReset/PasswordReset';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { ReportView } from '../pages/ReportView/ReportView';
import { selectUser } from '../redux/user/userSelectors';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  const user = useSelector(selectUser);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <LandingPage />} />
      <Route element={<LoginAndSignUp />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/resetPassword" element={<PasswordReset />} />

      {/* protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:userId" element={<ProfilePage isViewMode />} />
        <Route path="/post-report" element={<CreateOrEditReport />} />
        <Route path="/edit-report/:id" element={<CreateOrEditReport isEditMode />} />
        <Route path="/report/:id" element={<ReportView />} />
      </Route>
    </Routes>
  );
}
