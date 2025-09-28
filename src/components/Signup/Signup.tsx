import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import './signup.scss';

import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { USER_CREATED_MESSAGE } from '../../app/constants';
import { UserActions } from '../../redux/user/userActions';
import { selectUser, selectUserErrorMessage } from '../../redux/user/userSelectors';
import { Notification } from '../Notification/Notification';

export interface signupFormInputs {
  email: string;
  password: string;
  name: string;
}

export function Signup() {
  const dispatch = useDispatch();

  const signupErrorMessage = useSelector(selectUserErrorMessage);
  const user = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<signupFormInputs>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<signupFormInputs> = (data) => {
    dispatch(
      UserActions.SignUpUser({
        userName: data.name,
        userEmail: data.email,
        userPassword: data.password,
      })
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
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
          />
          <TextField
            className="password-field"
            label="Password"
            type="password"
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
          />
          <Button className="signup-button" type="submit" disabled={!isValid}>
            Sign Up
          </Button>
        </form>
      </div>
      {signupErrorMessage && <Notification alertMessage={signupErrorMessage} type="error" />}
      {user && <Notification alertMessage={USER_CREATED_MESSAGE} type="success" />}
    </div>
  );
}
