import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';


const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const{handleRegister , handleLogin} = React.useContext(AuthContext);

  

//   const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password);
                console.log(result); // will show token / user info
                setMessage("Login successful!");
                setOpen(true);
                setError("");
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let msg =err.response?.data?.message ||err.message ||"Something went wrong. Please try again.";
            setError(msg);
            setOpen(true);
        }
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Image section */}
        <Grid
          sx={{
            flexBasis: {
              xs: '0%',
              sm: '33.33%',
              md: '58.33%',
            },
            display: {
              xs: 'none',
              sm: 'block',
            },
            backgroundImage:
              'url(3ddfca15-e046-402e-8c35-ffba57646c1b.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Form section */}
        <Grid
          component={Paper}
          elevation={6}
          square
          sx={{
            flexBasis: {
              xs: '100%',
              sm: '66.66%',
              md: '41.66%',
            },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Box sx={{ mb: 2 }}>
              <Button
                variant={formState === 0 ? 'contained' : 'outlined'}
                onClick={() => setFormState(0)}
                sx={{ mr: 1 }}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? 'contained' : 'outlined'}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={error || message}
        onClose={() => setOpen(false)}
      />

    </ThemeProvider>
  );
}
