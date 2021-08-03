import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../config';
import War from './War';

function Play() {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    let events = new EventSource(`${url}/api/games/play/${id}`);

    events.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setGame(parsedData);
    };
    events.onerror = (event) => {
      events.close();
    };
    return () => events.close();
  }, [id]);

  useEffect(() => {
    setIsLoading(false);
  }, [game]);

  return (
    !isLoading &&
    game && (
      <div className="play-area play--war">{game.typeOfGame === 'War' && <War game={game} />}</div>
    )
  );
}

export default Play;
