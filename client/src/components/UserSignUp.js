import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { url, errorRoutes } from '../config';
import { useUserContext } from '../context/UserContext';
import ValidationErrors from './partials/ValidationErrors';

function UserSignUp() {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();
  const { signIn } = useUserContext();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    try {
      if (formValues.password !== formValues.confirmPassword) {
        const err = new Error();
        err.response = {
          data: {
            message: 'Sign up failed.',
            errors: ['Password and Confirm Password do not match'],
          },
          status: 400,
        };
        throw err;
      }
      await axios({
        method: 'post',
        url: `${url}/api/users`,
        data: formValues,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // pass data up to context
      await signIn(formValues.emailAddress, formValues.password);

      history.push('/');
    } catch (err) {
      if (err.response.status === 400) {
        setError(err.response.data);
        setIsLoading(false);
      } else {
        history.push(errorRoutes[err.response.status] || '/error');
      }
    }
  }

  function handleFormChange(e) {
    setFormValues((prevState) => {
      return {
        // spread previous state to ensure persistence of form field values
        ...prevState,
        // whichever form field is the target of the change event will have its
        // name attribute used as a property on formValues and its value saved
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    !isLoading && (
      <div className="form--centered">
        <h2>Sign Up</h2>
        {/* displays validation errors when they exist */}
        {error.errors && <ValidationErrors error={error} />}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formValues['firstName'] || ''}
            onChange={handleFormChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formValues['lastName'] || ''}
            onChange={handleFormChange}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            value={formValues['emailAddress'] || ''}
            onChange={handleFormChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues['password'] || ''}
            onChange={handleFormChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formValues['confirmPassword'] || ''}
            onChange={handleFormChange}
          />
          <button className="button" type="submit">
            Submit
          </button>
          <Link to="/" className="button button-secondary">
            Cancel
          </Link>
        </form>
        <p>
          Already have a user account? Click here to <Link to="/signin">sign in</Link>!
        </p>
      </div>
    )
  );
}

export default UserSignUp;
