import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useFetchData } from '../hooks';
import images from '../img';

function War({ game }) {
  const { user } = useUserContext();
  const { fetchData } = useFetchData({
    isLoading: true,
    data: null,
    error: null,
  });

  function handleReady() {
    fetchData({
      apiRoute: `/api/games/war/${game.id}/play`,
      isAuthRequired: true,
      method: 'GET',
    });
  }
  return (
    <>
      {game.status !== 'created' &&
        game.gameplay.map((player) => (
          <figure className="player--cards" key={player.id}>
            {player.event && <h3 className="player--event">{player.event}!</h3>}
            {player.showCards.map((card, i) => (
              <img
                className="card--image"
                key={i}
                src={images[card]}
                alt={`Card belonging to ${player.name}: ${card}`}
              />
            ))}
            <figcaption className="player--name">
              {`${player.name}: ${player.showCards.join(', ')}`}

              <span className={player.ready ? 'ready' : undefined}>
                -- {player.ready && 'Ready!'}
              </span>
            </figcaption>
            {player.id === user.id && (
              <>
                <button onClick={handleReady} disabled={player.ready} className="ready--button">
                  {player.ready ? 'Waiting...' : 'Ready'}
                </button>
              </>
            )}
          </figure>
        ))}
    </>
  );
}

export default War;
