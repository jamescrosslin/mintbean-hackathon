import { useCallback, useState } from 'react';
import { url } from '../config';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

export function useFetchData(initialValues) {
  const { user } = useUserContext();
  const [{ isLoading, data, error }, setState] = useState(initialValues);

  const fetchData = useCallback(
    async function ({ apiRoute, method, isAuthRequired, body, transformFunction }) {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));

        const requestOptions = {
          method,
          url: `${url}${apiRoute}`,
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (body) requestOptions.data = body;
        if (isAuthRequired)
          requestOptions.auth = { username: user.username, password: user.password };

        const { data } = await axios(requestOptions);

        const updata = transformFunction ? transformFunction(data) : data;

        setState((prevState) => ({ ...prevState, data: updata }));
        setState((prevState) => ({ ...prevState, isLoading: false }));
      } catch (err) {
        setState((prevState) => ({ ...prevState, error: err }));
      }
    },
    [user.password, user.username],
  );

  return { isLoading, data, error, fetchData };
}
