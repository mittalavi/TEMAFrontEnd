import { useEffect, React } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userActions } from "./store/features/user/userSlice"; // for the reducers
import { loginUser } from "./store/features/user/userSlice"; // for extra reducers

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://osttra.com/">
        OSTTRA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const message = useSelector((state) => state.auth.message);
  const isError = useSelector((state) => state.auth.isError);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (message) {
        toast(message, {
          type: isError ? "error" : "success",
          autoClose: 2000,
        });
        dispatch(userActions.messageReset());
      }
    }
  }, [message, isError, dispatch, isLoading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username: data.get("username"),
      password: data.get("password"),
    };
    dispatch(loginUser(user));
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          padding: "2rem",
          marginTop: "6rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "0.2rem",
        }}
      >
        <Typography component="h1" variant="h4">
          TEMA
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
