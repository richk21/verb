import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CancelRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Typography, useTheme } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserActions } from '../../redux/user/userActions';
import { selectUserErrorMessage, selectUserSuccessMessage } from '../../redux/user/userSelectors';
import { setErrorMessage, setSuccessMessage } from '../../redux/user/userSlice';
import { AuthLayout } from '../AuthTabs/AuthLayout';
import { AuthTabs } from '../AuthTabs/AuthTabs';
import { Notification } from '../Notification/Notification';

export interface signupFormInputs {
  email: string;
  password: string;
  name: string;
  organizationName: string;
}

export function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const signupErrorMessage = useSelector(selectUserErrorMessage);
  const signupSuccessMessage = useSelector(selectUserSuccessMessage);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<signupFormInputs>({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<signupFormInputs> = (data) => {
    dispatch(
      UserActions.SignUpUser({
        userName: data.name,
        userEmail: data.email,
        userPassword: data.password,
        organizationName: data.organizationName,
      })
    );
  };
  const name = watch('name');
  const emailId = watch('email');
  const password = watch('password');
  const organizationName = watch('organizationName');

  const onLoginClick = () => {
    navigate('../login');
  };

  return (
    <AuthLayout variant="split">
      <AuthTabs />
      <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 600 }}>
        Create your account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Already have an account?{' '}
        <span
          onClick={onLoginClick}
          style={{ color: theme.palette.primary.main, cursor: 'pointer', fontWeight: 600 }}
        >
          Log in
        </span>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className="name-field"
          label="Name"
          type="name"
          fullWidth
          margin="normal"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be atleast 2 characters',
            },
            maxLength: {
              value: 50,
              message: 'Name must not exceed 50 characters',
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Name can only contain letters',
            },
          })}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setValue('name', '')}
                    edge="end"
                    sx={{
                      visibility: name ? 'visible' : 'hidden',
                      width: '24px',
                      marginRight: '1px',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: theme.palette.text.primary,
                      },
                    }}
                  >
                    {name && <CancelRounded />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          className="organization-field"
          label="Organization name"
          type="text"
          fullWidth
          margin="normal"
          {...register('organizationName', {
            required: 'Organization name is required',
            minLength: { value: 2, message: 'Organization name must be at least 2 characters' },
            maxLength: {
              value: 100,
              message: 'Organization name must not exceed 100 characters',
            },
          })}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setValue('organizationName', '')}
                    edge="end"
                    sx={{
                      visibility: organizationName ? 'visible' : 'hidden',
                      width: '24px',
                      marginRight: '1px',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: theme.palette.text.primary,
                      },
                    }}
                  >
                    {organizationName && <CancelRounded />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          error={!!errors.organizationName}
          helperText={
            errors.organizationName?.message ||
            "If this org already exists, you'll join it as a Contributor. If it's new, you'll become its first Admin."
          }
        />
        <TextField
          className="email-field"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Enter a valid email address',
            },
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
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character',
            },
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
          Sign Up
        </Button>
        <Box display="flex" alignItems="center" gap={2} my={2}>
          <Box flex={1} height="1px" bgcolor="grey.400" />

          <Typography variant="body2" color="textPrimary">
            OR
          </Typography>

          <Box flex={1} height="1px" bgcolor="grey.400" />
        </Box>
        <Box sx={{ marginTop: '10px', width: '100%' }}>
          {organizationName ? (
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                dispatch(
                  UserActions.GoogleAuthUser({ token: credentialResponse.credential || '' })
                );
              }}
              theme="outline"
              size="large"
              logo_alignment="center"
              text="signup_with"
              onError={() => console.log('Signup Failed')}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Enter an organization name above to sign up with Google
            </Typography>
          )}
        </Box>
      </form>
      {signupErrorMessage && (
        <Notification
          onClear={() => dispatch(setErrorMessage(null))}
          alertMessage={signupErrorMessage}
          type="error"
        />
      )}
      {signupSuccessMessage && (
        <Notification
          onClear={() => dispatch(setSuccessMessage(null))}
          alertMessage={signupSuccessMessage}
          type="success"
        />
      )}
    </AuthLayout>
  );
}
