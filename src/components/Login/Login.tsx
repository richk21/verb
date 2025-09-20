import "./login.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

export interface LoginFormInputs {
  email: string;
  password: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className='email-field'
            label='Email'
            type='email'
            fullWidth
            margin='normal'
            {...register("email", {
              required: "Email is required",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            className='password-field'
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            {...register("password", {
              required: "Password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button className='login-button' type='submit' disabled={!isValid}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
