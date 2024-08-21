import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../asset/logo.png";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SignUp() {
  const [name, setName] = useState('');
  const [newemail, setNewEmail] = useState('');
  const [newmob, setNewMob] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const mobRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_]{6,20}$/;

    if (!nameRegex.test(name)) {
      newErrors.name = 'Name must contain only letters and spaces';
    }
    if (!emailRegex.test(newemail)) {
      newErrors.email = "Email must be in the format 'word@gmail.com'";
    }
    if (!mobRegex.test(newmob)) {
      newErrors.mob = 'Mobile number must contain exactly 10 digits';
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters long and contain at least one number';
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
      await axios.post('http://localhost:2000/adduser', { name, email: newemail, mob: newmob, password });
      localStorage.setItem("loggedInUser", newemail); // Set the logged-in user
      alert('Registration successful!');
      // Redirect to Login page after successful registration
      window.location.href = '/login'
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
      <Container component="main" maxWidth="xs" className="fadeInZoom">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} id='logo' alt="Logo" />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  helperText={errors.name}
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
                  value={newemail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  error={errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobnumber"
                  label="Mobile Number"
                  name="mobnumber"
                  autoComplete="tel"
                  value={newmob}
                  onChange={(e) => setNewMob(e.target.value)}
                  error={!!errors.mob}
                  helperText={errors.mob}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <FormControlLabel
                  control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} color="primary" />}
                  label="Show Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,color:"white", backgroundColor: '#AB65F6','&:hover': {backgroundColor: '#AB65F6'} }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default SignUp