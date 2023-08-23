import * as React from 'react';
import { Auth } from 'aws-amplify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

// setting our theme up
const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(()=>{
    // fetch the signup success message if it exists
    if (location.state) {
      setMessage(location.state.signup);
    }
	}, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // sign our user in. No input validation is necessary as it is handled by Cognito by default
    try {
      const user = await Auth.signIn(data.get('username'), data.get('password'));
      const role = user.attributes['custom:role'];
      // redirect the user to the relevant page based on the role attribute chosen at signup
      navigate(`/${role}`, {user: user});
    } catch (error) {
      console.log(error);
      setMessage('');
      setError(error.toString());
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Grid item xs={12}>
                <Alert severity="error">{error.toString()}</Alert>
              </Grid>}
            {message && <Grid item xs={12}>
              <Alert severity="success">{message}</Alert>
              </Grid>
              }
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
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}