import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Authorized from './components/Authorized';
import SignUp from './routes/SignUp';

const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/login">
          <></>
        </Route>
        <Route path="/">
          <Authorized fallback={<Redirect to="/sign-up" />}>
            <></>
          </Authorized>
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
