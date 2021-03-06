import {
  AppBar as MuiAppBar,
  Button,
  createStyles, Drawer,
  IconButton,
  makeStyles, MenuItem,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React from 'react';
import { AccountCircle } from '@material-ui/icons';
import Authorized from '../Authorized';
import client from '../../api/client';

const drawerWidth = 300;

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const AppBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const openAvatarMenu = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    client.auth.signOut()
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        return history.push('/login');
      });
  };
  return (
    <MuiAppBar position="static" color="transparent" className={classes.root}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </Drawer>
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
        <Authorized fallback={(<></>)}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openAvatarMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Info</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Authorized>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
