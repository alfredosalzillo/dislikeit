import {
  createStyles, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import { useMe } from '../../api/users';
import ChangeUsernameField from '../ChangeUsernameField';

const useStyles = makeStyles(() => createStyles({
  welcomeMessage: {
    textAlign: 'center',
    padding: '20px',
  },
}));
const WelcomeMessage = () => {
  const classes = useStyles();
  const { data: me } = useMe();
  if (!me?.username) {
    return (
      <>
        <Typography variant="h4" className={classes.welcomeMessage}>
          Welcome! Choose an username and start sharing.
        </Typography>
        <ChangeUsernameField />
      </>
    );
  }
  return (
    <Typography variant="h4" className={classes.welcomeMessage}>
      Welcome
      {' '}
      {me!.username}
      ! You can start disliking things!
    </Typography>
  );
};

export default WelcomeMessage;
