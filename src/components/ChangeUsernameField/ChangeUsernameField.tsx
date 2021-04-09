import React, { useState } from 'react';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { ApiError } from '../../api/client';
import { saveUsername, useMe } from '../../api/users';

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

export default ChangeUsernameField;
