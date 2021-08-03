import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useFetchData } from '../hooks';

function War({ game }) {
  const { user } = useUserContext();
  const { data, fetchData } = useFetchData({
    isLoading: true,
    data: null,
    error: null,
  });

  function handleReady() {
    fetchData({
      apiRoute: `/api/games/war/${game.id}/play`,
      method: 'GET',
      isAuthRequired: true,
    });
  }
  return (
    <>
      {game.status !== 'created' &&
        game.gameplay.map((player) => (
          <figure key={player.id}>
            {player.event && <h3>{player.event}!</h3>}
            {player.showCards.map((card, i) => (
              <img
                key={i}
                // src={`../img/${game.gameplay[player.id]}`}
                alt={`Card belonging to ${player.name}: ${card}`}
              />
            ))}
            <figcaption>
              {`${player.name}: ${player.showCards.join(', ')}`}
              <span className={player.ready ? 'ready' : undefined}>{player.ready && 'Ready!'}</span>
            </figcaption>
            {player.id === user.id && (
              <>
                <button onClick={handleReady} disabled={player.ready}>
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
