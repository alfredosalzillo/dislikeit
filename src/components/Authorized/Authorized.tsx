import React from 'react';
import { useSession } from '../../api/client';

export type AuthorizedProps = React.PropsWithChildren<{
  fallback?: React.ReactNode,
}>;
const Authorized: React.FC<AuthorizedProps> = ({
  fallback,
  children,
}) => {
  const session = useSession();
  return <>{session ? children : fallback}</>;
};

export default Authorized;
