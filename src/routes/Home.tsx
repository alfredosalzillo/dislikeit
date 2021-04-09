import React, { Suspense } from 'react';
import { Container } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Authorized from '../components/Authorized';
import WelcomeMessage from '../components/WelcomeMessage';
import AppBar from '../components/AppBar';

const Home = () => (
  <>
    <AppBar />
    <Container>
      <Suspense fallback={<Skeleton variant="text" width="100%"/>}>
        <Authorized>
          <WelcomeMessage />
        </Authorized>
      </Suspense>
    </Container>
  </>
);

export default Home;
