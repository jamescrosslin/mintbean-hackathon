import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { errorRoutes } from '../config';

function UserSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useUserContext();

  let history = useHistory();
  let location = useLocation();
  // gets previous route from location object
  let { from } = location.state || { from: { pathname: '/' } };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await signIn(email, password);
    // if the response is an error, redirect to handler route
    if (response.status !== 200) history.push(errorRoutes?.[response.status] || '/error');
    else {
      history.replace(from);
    }
  }

  return (
    !isLoading && (
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Submit
          </button>
          <Link to="/" className="button button-secondary">
            Cancel
          </Link>
        </form>
        <p>
          Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
        </p>
      </div>
    )
  );
}

export default UserSignIn;
