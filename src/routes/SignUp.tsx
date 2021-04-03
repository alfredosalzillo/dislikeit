import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link as MuiLink, CircularProgress,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import client, { ApiError } from '../api/client';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const signUp = () => {
    setLoading(true);
    setError(error);
    return client
      .auth
      .signUp({
        email, password,
      })
      .then((response) => {
        setLoading(false);
        if (response.error) {
          return setError(response.error as unknown as ApiError);
        }
        setError(null);
        return history.push('/');
      });
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="space-around"
      style={{
        height: '100%',
      }}
    >
      <Grid item>
        <Container maxWidth="xs">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" align="center">
                Create an account
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form name="sign-up">
                <Grid container spacing={2}>
                  {error && (
                    <Grid item xs={12}>
                      <Alert severity="error">{error.message}</Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      variant="outlined"
                      label="email"
                      placeholder="angelo.caci@getnada.com"
                      fullWidth
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      variant="outlined"
                      label="password"
                      type="password"
                      fullWidth
                      disabled={loading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      size="large"
                      fullWidth
                      disabled={loading}
                      onClick={signUp}
                      startIcon={loading && (
                        <CircularProgress
                          size={20}
                          disableShrink
                        />
                      )}
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Already registered?
                {' '}
                <MuiLink
                  component={Link}
                  to="/login"
                >
                  Login
                </MuiLink>
                {' '}
                instead.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignUp;
