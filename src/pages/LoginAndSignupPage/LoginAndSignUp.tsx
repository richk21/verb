import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PathEnums } from '../../app/enum/pathEnums';
import { Tab, Tabs } from '@mui/material';
import './loginAndSignUp.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/userSelectors';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginAndSignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname === PathEnums.Login ? PathEnums.Login : PathEnums.Signup;
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login-signup-container">
      <div className="login-box">
        <Tabs
          value={currentPath}
          centered
          className="login-signup-tabs"
          indicatorColor="primary"
          textColor="inherit"
        >
          <Tab label="Login" value={PathEnums.Login} component={Link} to="/login" />
          <Tab label="Signup" value={PathEnums.Signup} component={Link} to="/signup" />
        </Tabs>
        <Outlet />
      </div>
    </div>
  );
}
