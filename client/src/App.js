import { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import Header from './components/partials/Header';
import Games from './components/Games';
import Home from './components/Home';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import Play from './components/Play';
import Join from './components/Join';

import { useUserContext } from './context/UserContext';

function App() {
  const { user, signIn, signOut } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect will run when the app first opens and sign in a user
  // if previous user information is available in localStorage
  useEffect(() => {
    // IIFE runs this function without requiring a function declaration
    (async () => {
      setIsLoading(true);
      if (localStorage?.user) {
        try {
          // using a try block becuase JSON.parse can throw an error if
          // data is somehow not in JSON format
          const { username, password } = JSON.parse(localStorage.user);
          const { status } = await signIn(username, password);
          if (status !== 200)
            throw new Error('Presistent sign in failed. Removing sign in information.');
        } catch (err) {
          signOut();
        }
      }
      setIsLoading(false);
    })();
  }, [signIn, signOut]);

  return (
    !isLoading && (
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <PrivateRoute path="/games" exact>
              <Games />
            </PrivateRoute>
            <PrivateRoute path="/games/join/:id">
              <Join />
            </PrivateRoute>
            <PrivateRoute path="/games/play/:id">
              <Play />
            </PrivateRoute>
            <PrivateRoute path="/games/create"></PrivateRoute>
            <PrivateRoute path="/games/:id/update" exact></PrivateRoute>
            <Route path="/games/:id"></Route>
            {/* UserSignIn component only renders if there is no user information available */}
            <Route path="/signin">{user?.username ? <Redirect to="/" /> : <UserSignIn />}</Route>
            <Route path="/signup">
              <UserSignUp />
            </Route>
            <Route path="/signout">
              <UserSignOut />
            </Route>
            <Route path="/notfound">
              <NotFound />
            </Route>
            <Route path="/forbidden">
              <Forbidden />
            </Route>
            <Route path="/error">
              <UnhandledError />
            </Route>
            <Route>
              <Redirect to="/notfound" />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    )
  );
}

export default App;
