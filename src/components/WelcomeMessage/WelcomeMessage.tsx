import { Typography } from '@material-ui/core';
import React from 'react';
import { useMe } from '../../api/users';
import ChangeUsernameField from '../ChangeUsernameField';

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

export default WelcomeMessage;
