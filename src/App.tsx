import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import Home from './routes/Home';
import Notifications from './components/Notifications';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <Notifications>
    <ErrorBoundary>
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Switch>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  </Notifications>
);

export default App;
