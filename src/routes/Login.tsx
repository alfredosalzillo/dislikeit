import React, { useState } from 'react';
import {
  Button, CircularProgress, Container, Grid, TextField, Typography, Link as MuiLink,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import client, { ApiError } from '../api/client';

const Login = () => {
  const [error, setError] = useState<ApiError | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const login = () => {
    setLoading(true);
    return client
      .auth
      .signIn({
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
              <Typography variant="h4" align="center">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form name="login">
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
                      placeholder="alfredo.supa@getall.it"
                      fullWidth
                      disabled={loading}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      variant="outlined"
                      label="password"
                      type="password"
                      disabled={loading}
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      size="large"
                      fullWidth
                      onClick={login}
                      disabled={loading}
                      startIcon={loading && (
                        <CircularProgress
                          size={20}
                          disableShrink
                        />
                      )}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                {'Don\'t have an account? Sign up '}
                <MuiLink
                  component={Link}
                  to="/sign-up"
                >
                  here
                </MuiLink>
                .
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
