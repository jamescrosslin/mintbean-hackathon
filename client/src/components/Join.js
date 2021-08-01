import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useFetchData } from '../hooks';
import { errorRoutes } from '../config';

function Join() {
  const { isLoading, data, error } = useFetchData({});
  const { id } = useParams();
  return (
    (error && <Redirect to={errorRoutes[error.response.status] || '/error'} />) ||
    (data && <Redirect to="/games"></Redirect>)
  );
}

export default Join;
