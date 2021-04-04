import React, { Suspense, useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Button, createStyles, Theme, makeStyles, Container, TextField, InputAdornment,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import Authorized from '../components/Authorized';
import { saveUsername, useMe } from '../api/users';
import { ApiError } from '../api/client';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBar = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <MuiAppBar position="static" color="transparent" className={classes.root}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="h1" className={classes.title}>
          dislikeit
        </Typography>
        <Authorized fallback={(
          <Button
            color="inherit"
            onClick={() => history.push('/login')}
          >
            Login
          </Button>
        )}
        >
          <></>
        </Authorized>
      </Toolbar>
    </MuiAppBar>
  );
};

const ChangeUsernameField = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<ApiError | null>(null);
  const { revalidate } = useMe();
  return (
    <TextField
      variant="outlined"
      name="username"
      placeholder="lupo93"
      value={username}
      fullWidth
      error={!!error}
      helperText={error?.message || ''}
      onChange={(e) => setUsername(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              color="primary"
              disabled={username.length < 4}
              onClick={() => saveUsername(username)
                .then((response) => {
                  if (response.error) setError(response.error as unknown as ApiError);
                  return revalidate();
                })}
            >
              Save
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};
const WelcomeMessage = () => {
  const { data: me } = useMe();
  if (!me?.username) {
    return (
      <>
        <Typography variant="body1">
          Welcome! Choose an username and start sharing.
        </Typography>
        <ChangeUsernameField />
      </>
    );
  }
  return (
    <Typography variant="body1">
      Welcome
      {' '}
      {me!.username}
      ! You can start disliking things!
    </Typography>
  );
};
const Home = () => (
  <>
    <AppBar />
    <Container>
      <Suspense fallback={<Skeleton variant="text" width="100%" />}>
        <Authorized>
          <WelcomeMessage />
        </Authorized>
      </Suspense>
    </Container>
  </>
);

export default Home;
