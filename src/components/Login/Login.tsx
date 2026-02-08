import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CancelRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Typography, useTheme } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
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

  const onSignUpClick = () => {
    navigate('../signup');
  };

  const onForgotPasswordClick = () => {
    navigate('../resetPassword');
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        borderRadius: '25px',
      }}
    >
      <Typography variant="h4">Welcome back!</Typography>
      <Typography sx={{ color: theme.palette.primary.dark }}>
        New to Verb?{' '}
        <span onClick={onSignUpClick} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          Sign up
        </span>
      </Typography>
      <Box
        sx={{
          width: '100%',
          padding: '1rem',
          borderRadius: '12px',
          textAlign: 'center',
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.primary.main,
          },
        }}
      >
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
          <Typography sx={{ width: '100%', textDecoration: 'underline', cursor: 'pointer' }}>
            <span onClick={onForgotPasswordClick}>forgot password?</span>
          </Typography>
          <Button
            type="submit"
            disabled={!isValid}
            sx={{
              width: '100%',
              minWidth: '150px',
              padding: '0.5rem',
              background: theme.palette.primary.contrastText,
              color: '$white',
              border: 'none',
              fontSize: '0.875rem',
              cursor: 'pointer',
              margin: '20px 0',
              transition: 'background 0.2s ease',
              '&:disabled': {
                opacity: '0.6',
              },
              '&:hover': {
                background: '$charcoal',
              },
            }}
          >
            Login
          </Button>
          <Box display="flex" alignItems="center" gap={2} my={2}>
            <Box flex={1} height="1px" bgcolor="grey.400" />

            <Typography variant="body2" color="textPrimary">
              OR
            </Typography>

            <Box flex={1} height="1px" bgcolor="grey.400" />
          </Box>
          <Box sx={{ marginTop: '10px', width: '100%' }}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                dispatch(
                  UserActions.GoogleAuthUser({ token: credentialResponse.credential || '' })
                );
              }}
              theme="outline"
              size="large"
              logo_alignment="center"
              text="continue_with"
              onError={() => console.log('Login Failed')}
            />
          </Box>
        </form>
      </Box>
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
