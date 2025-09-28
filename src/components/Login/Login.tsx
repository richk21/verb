import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import './login.scss';

import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS_MESSAGE } from '../../app/constants';
import { UserActions } from '../../redux/user/userActions';
import { selectUser, selectUserErrorMessage } from '../../redux/user/userSelectors';
import { Notification } from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
  });
  const user = useSelector(selectUser);
  const loginErrorMessage = useSelector(selectUserErrorMessage);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(
      UserActions.LoginUser({
        userEmail: data.email,
        userPassword: data.password,
      })
    );
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className="email-field"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register('email', {
              required: 'Email is required',
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            className="password-field"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', {
              required: 'Password is required',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button className="login-button" type="submit" disabled={!isValid}>
            Login
          </Button>
        </form>
      </div>
      {loginErrorMessage && <Notification alertMessage={loginErrorMessage} type="error" />}
      {user && <Notification alertMessage={LOGIN_SUCCESS_MESSAGE} type="success" />}
    </div>
  );
}
