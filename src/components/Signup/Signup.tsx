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
import { Notification } from '../Notification/Notification';

export interface signupFormInputs {
  email: string;
  password: string;
  name: string;
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
      })
    );
  };
  const name = watch('name');
  const emailId = watch('email');
  const password = watch('password');

  const onLoginClick = () => {
    navigate('../login');
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
      <Typography variant="h4">Create an account</Typography>
      <Typography sx={{ color: theme.palette.primary.dark, justifyContent: 'left' }}>
        Already have an account?{' '}
        <span onClick={onLoginClick} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          Log in
        </span>
      </Typography>
      <Box
        sx={{
          width: '70%',
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
          </Box>
        </form>
      </Box>
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
    </Box>
  );
}
