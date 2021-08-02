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
      console.log(parsedData);
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
          game.gameplay.map((player) => (
            <figure key={player.id}>
              {player.event && <h3>{player.event}!</h3>}
              {player.showCards.map((card, i) => (
                <img
                  // src={`../img/${game.gameplay[player.id]}`}
                  alt={`Card belonging to ${player.name}: ${card}`}
                />
              ))}
              <figcaption>
                {`${player.name}: ${player.showCards.join(', ')}`}
                <span className={player.ready}>{player.status}</span>
              </figcaption>
              {player.id === user.id && (
                <>
                  <button disabled={player.ready}>{player.ready ? 'Waiting...' : 'Ready'}</button>
                </>
              )}
            </figure>
          ))}
      </div>
    ))
  );
}

export default Play;
