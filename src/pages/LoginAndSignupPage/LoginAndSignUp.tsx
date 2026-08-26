import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/user/userSelectors';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginAndSignUp() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return <Outlet />;
}
