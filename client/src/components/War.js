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
      apiRoute: `/api/games/war/${game.id}/turn`,
      isAuthRequired: true,
      method: 'GET',
    });
  }
  return (
    <>
      {game.gameplay.some((player) => player.event === 'War') && (
        <h3 className="war--instructions">Each player puts 4 cards in the pot</h3>
      )}
      {game.status === 'created' && (
        <>
          <h3 className="war--instructions">All players must join a game before it starts!</h3>
          <h4>Invite players: {`${window.location}games/join/${game.id}`}</h4>
        </>
      )}
      {game.status !== 'created' &&
        game.status !== 'completed' &&
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
              {`${player.name}: ${player.showCards.map((card) => card.slice(1)).join(', ')}`}

              <span className={player.ready ? 'ready' : undefined}>
                {player.ready && ' -- Ready!'}
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
