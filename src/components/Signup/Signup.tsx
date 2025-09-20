import "./signup.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

export interface signupFormInputs {
  email: string;
  password: string;
  name: string;
}

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupFormInputs>();

  const onSubmit: SubmitHandler<signupFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className='name-field'
            label='Name'
            type='name'
            fullWidth
            margin='normal'
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            className='email-field'
            label='Email'
            type='email'
            fullWidth
            margin='normal'
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            className='password-field'
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button className='signup-button' type='submit'>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
