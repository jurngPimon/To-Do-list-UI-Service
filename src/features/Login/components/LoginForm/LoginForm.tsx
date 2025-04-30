"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { useFirebaseStore } from "@/store";
import { validateSchema } from "./LoginForm.util";

interface ILoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { apiController } = useFirebaseStore.getState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(validateSchema),
  });

  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    apiController.signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => apiController.signInWithGoogle()}
            >
              Login with Google
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
