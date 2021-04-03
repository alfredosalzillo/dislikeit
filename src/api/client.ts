import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export type ApiError = {
  status: number,
  message: string,
};

const client = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_KEY!,
);

export const useSession = () => {
  const [session, setSession] = useState(client.auth.session());
  useEffect(() => {
    const { data: subscription } = client
      .auth
      .onAuthStateChange((e, data) => setSession(data));
    return () => subscription?.unsubscribe();
  }, []);
  return session;
};

export default client;
