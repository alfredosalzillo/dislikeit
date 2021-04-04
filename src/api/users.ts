import useSWR from 'swr';
import client from './client';

export type User = {
  id: string,
  username: string,
};

export const fetchMe = () => client
  .from('me')
  .select('id, username')
  .single()
  .then(({ data, error }) => {
    if (error) throw new Error(error.message);
    return data;
  }) as Promise<User>;

export const useMe = () => useSWR<User>('/me', {
  fetcher: fetchMe,
  suspense: true,
  dedupingInterval: 3000,
});

export const saveUsername = (username: string) => client.from('me').update({
  username,
});
