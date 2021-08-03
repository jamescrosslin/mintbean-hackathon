import React from 'react';
import { useUserContext } from '../context/UserContext';

function War({ game }) {
  const { user } = useUserContext();

  function handleReady() {}
  return (
    <>
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
