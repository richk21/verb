import { Link, Outlet, useLocation } from "react-router-dom";
import { PathEnums } from "../../app/enum/pathEnums";
import { Tab, Tabs } from "@mui/material";
import "./loginAndSignUp.scss";

export interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginAndSignUp() {
  const location = useLocation();

  const currentPath =
    location.pathname === PathEnums.Login ? PathEnums.Login : PathEnums.Signup;
  return (
    <div className='login-signup-container'>
      <div className='login-box'>
        <Tabs
          value={currentPath}
          centered
          className='login-signup-tabs'
          indicatorColor='primary'
          textColor='inherit'>
          <Tab label='Login' component={Link} to='/login' />
          <Tab label='Signup' component={Link} to='/signup' />
        </Tabs>
        <Outlet />
      </div>
    </div>
  );
}
