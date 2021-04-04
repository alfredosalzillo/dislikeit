import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import Home from './routes/Home';

const App = () => (
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
);

export default App;
