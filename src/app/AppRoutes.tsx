import { Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Signup } from '../components/Signup/Signup';
import { CreateBlog } from '../pages/CreateBlog/CreateBlog';
import { Home } from '../pages/Home/Home';
import { LoginAndSignUp } from '../pages/LoginAndSignupPage/LoginAndSignUp';
import { PreviewBlog } from '../pages/PreviewBlog/PreviewBlog';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/blog-post" element={<CreateBlog />} />
      <Route path="/blog-preview" element={<PreviewBlog />} />
      <Route element={<LoginAndSignUp />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
