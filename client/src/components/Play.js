import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { url, errorRoutes } from '../config';
import War from './War';

const gameOptions = {
  'War': War,
};

function Play() {
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

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
      <div className="play-area play--war">{game.typeOfGame === 'War' && <War game={game} />}</div>
    ))
  );
}

export default Play;
