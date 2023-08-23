import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth } from 'aws-amplify';

// set up our theme to be dark
const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function SignUp() {
  const [role, setRole] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {

      // input checking for the role selection. No input checking is necessary for the other fields, as Cognito handles them by default.
      // role is a custom attribute in Cognito
      if(!role) {
        setError("AuthError: Role cannot be empty");
        return;
      }

      // registering our user. 
      const { user } = await Auth.signUp({
        username: data.get('username'),
        password: data.get('password'),
        attributes: {
          email: data.get('email'),
          'custom:role': role,
        }
      });
      navigate('/', {state:{signup: "Account created successfully, you may login."}});
    } catch (error) {
      setError(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {error && <Grid item xs={12}>
                <Alert severity="error">{error.toString()}</Alert>
              </Grid>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      value={role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value={"customer"}>Customer</MenuItem>
                      <MenuItem value={"adviser"}>Adviser</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link href="/" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}