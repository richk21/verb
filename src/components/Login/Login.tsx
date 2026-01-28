import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import './login.scss';

import { CancelRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserActions } from '../../redux/user/userActions';
import {
  selectUser,
  selectUserErrorMessage,
  selectUserSuccessMessage,
} from '../../redux/user/userSelectors';
import { setErrorMessage, setSuccessMessage } from '../../redux/user/userSlice';
import { Notification } from '../Notification/Notification';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
  });
  const user = useSelector(selectUser);
  const loginErrorMessage = useSelector(selectUserErrorMessage);
  const loginSuccessMessage = useSelector(selectUserSuccessMessage);
  const [showPassword, setShowPassword] = useState(false);
  const emailId = watch('email');
  const password = watch('password');

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
    <Box
      className="login-container"
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setValue('email', '')}
                      edge="end"
                      sx={{
                        visibility: emailId ? 'visible' : 'hidden',
                        width: '24px',
                        marginRight: '1px',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: theme.palette.text.primary,
                        },
                      }}
                    >
                      {emailId && <CancelRounded />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            className="password-field"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            {...register('password', {
              required: 'Password is required',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{
                        visibility: password ? 'visible' : 'hidden',
                        width: '24px',
                        marginRight: '10px',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: theme.palette.text.primary,
                        },
                      }}
                    >
                      {password && (showPassword ? <VisibilityOff /> : <Visibility />)}
                    </IconButton>
                    <IconButton
                      onClick={() => setValue('password', '')}
                      edge="end"
                      sx={{
                        visibility: password ? 'visible' : 'hidden',
                        width: '24px',
                        marginRight: '1px',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: theme.palette.text.primary,
                        },
                      }}
                    >
                      {password && <CancelRounded />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button className="login-button" type="submit" disabled={!isValid}>
            Login
          </Button>
        </form>
      </div>
      {loginErrorMessage && (
        <Notification
          onClear={() => dispatch(setErrorMessage(null))}
          alertMessage={loginErrorMessage}
          type="error"
        />
      )}
      {loginSuccessMessage && (
        <Notification
          onClear={() => dispatch(setSuccessMessage(null))}
          alertMessage={loginSuccessMessage}
          type="success"
        />
      )}
    </Box>
  );
}
