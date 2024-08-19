import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
<<<<<<< HEAD
=======
import CssBaseline from '@mui/material/CssBaseline';
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
<<<<<<< HEAD
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import logo from "./asset/logo.png";

=======
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import logo from "./images/logo.png";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Email must be in the format 'word@gmail.com'";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be between 6 to 20 characters long and contain at least one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:2000/login', { email, password });
      if (response.data === true) {
        localStorage.setItem("loggedInUser", email); // Set the logged-in user
        window.location.href = '/';
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
<<<<<<< HEAD
      <Container component="main" maxWidth="xs" className="fadeInZoom">
=======
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="fadeInZoom">
        <CssBaseline />
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} id='logo' alt='LOGO'></img>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
              error={errors.email}
=======
              error={!!errors.email}
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
              error={errors.password}
=======
              error={!!errors.password}
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304
              helperText={errors.password}
            />
            <FormControlLabel
              control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} color="primary" />}
              label="Show Password"
            />
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2, color:"white", backgroundColor: '#AB65F6','&:hover': {backgroundColor: '#AB65F6'}}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
<<<<<<< HEAD
      </Container>
=======
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304
  );
}

export default Login
