import React, { useCallback, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useFetchData } from '../hooks';
import Game from './Game';
import { errorRoutes } from '../config';
import CreateGame from './CreateGame';

function Games() {
  const {
    isLoading,
    data: games,
    error,
    fetchData,
  } = useFetchData({
    isLoading: true,
    data: null,
    error: null,
  });

  const [creating, setCreating] = useState(false);

  const refreshGames = useCallback(
    async function () {
      fetchData({
        apiRoute: '/api/games',
        method: 'GET',
        isAuthRequired: true,
        transformFunction: ({ games }) => games.map((game) => <Game key={game.id} {...game} />),
      });
    },
    [fetchData],
  );

  useEffect(() => {
    refreshGames();
  }, [refreshGames]);

  return (
    (error && <Redirect to={errorRoutes[error.response.status] || '/error'} />) || (
      <div className="wrap main--grid">
        {!isLoading && games}
        <button
          onClick={() => setCreating((prevState) => !prevState)}
          className="course--module course--add--module"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Game
          </span>
        </button>
        {creating && (
          <CreateGame
            refreshGames={refreshGames}
            dismissForm={() => setCreating((prevState) => !prevState)}
          />
        )}
      </div>
    )
  );
}

export default Games;
