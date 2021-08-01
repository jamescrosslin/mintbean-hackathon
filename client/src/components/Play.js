import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { url, errorRoutes } from '../config';
import { useUserContext } from '../context/UserContext';
import { useFetchData } from '../hooks';

function Play() {
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useUserContext();

  useEffect(() => {
    setIsLoading(true);
    let events = new EventSource(`${url}/api/games/play/${id}`);

    events.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData.Users);
      setGame(parsedData);
    };
    events.onerror = (event) => {
      events.close();
      console.log('EventSource error: ', event, event.error);
    };
    return () => events.close();
  }, [id]);

  useEffect(() => {
    setIsLoading(false);
  }, [game]);

  return (
    (error && <Redirect to={errorRoutes[error.response.status] || '/error'} />) ||
    (!isLoading && game && (
      <div className="play-area">
        {game.status !== 'created' &&
          game.Users.map((player) => (
            <figure key={player.id}>
              <img
                // src={`../img/${game.deck[player.id]}`}
                alt={`Card belonging to ${player.firstName}: ${game.deck[player.id]}`}
              />
              <figcaption>
                {`${player.firstName}: ${game.deck[player.id]}`}
                <span className={game.deck[player.id].status}>{game.deck[player.id].status}</span>
              </figcaption>
              {player.id === user.id && player.status === 'waiting' && (
                <>
                  <button>Ready</button>
                </>
              )}
            </figure>
          ))}
      </div>
    ))
  );
}

export default Play;
