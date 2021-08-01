import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

function UserSignOut() {
  const { signOut } = useUserContext();

  useEffect(() => signOut(), [signOut]);
  return <Redirect to="/"></Redirect>;
}

export default UserSignOut;
