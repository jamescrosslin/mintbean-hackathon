import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useFetchData } from '../hooks';
import { errorRoutes } from '../config';

function Join() {
  const { isLoading, data, error, fetchData } = useFetchData({});
  const { id } = useParams();
  useEffect(() => {
    fetchData({
      apiRoute: `/api/games/join/${id}`,
      method: 'GET',
      isAuthRequired: true,
    });
  }, [fetchData, id]);
  return (
    !isLoading &&
    ((error && <Redirect to={errorRoutes[error.response.status] || '/error'} />) ||
      (data && <Redirect to="/games"></Redirect>) ||
      null)
  );
}

export default Join;
