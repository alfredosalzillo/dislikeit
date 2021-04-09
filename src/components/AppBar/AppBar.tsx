import {
  AppBar as MuiAppBar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Authorized from '../Authorized';

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

export default AppBar;
