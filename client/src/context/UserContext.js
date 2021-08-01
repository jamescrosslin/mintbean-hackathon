import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { url } from '../config';

const UserContext = createContext({
  user: {},
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  // by creating state inside the provider, state is available in all child components of UserProvider
  const [user, setUser] = useState({});
  // value prop represents the value of UserContext and changes that value as UserProvider state changes
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  // by calling useContext, the state of UserProvider is available
  const { user, setUser } = useContext(UserContext);

  const signIn = useCallback(
    async (username, password) => {
      try {
        const response = await axios({
          method: 'get',
          url: `${url}/api/users`,
          auth: { username, password },
        });
        const { data } = response;
        // on success, saves user data to localStorage
        localStorage.user = JSON.stringify({ ...data, username, password });
        // setUser changes the state on UserProvider which changes the UserContext
        setUser({ ...data, username, password });
        return response;
      } catch (err) {
        // return error for component error handling
        return err.response;
      }
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    // resets user state and stored data
    setUser({});
    localStorage.removeItem('user');
  }, [setUser]);

  // by exporting an object, we make UserProvider state and functions available to
  // all child components of UserProvider that call useUserContext
  return { user, signIn, signOut };
};
