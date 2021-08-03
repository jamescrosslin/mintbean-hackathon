import React from "react"
import { useUserContext } from "../context/UserContext"
import { useFetchData } from "../hooks"
import images from "../img"

function War({ game }) {
  const { user } = useUserContext()
  const { data, fetchData } = useFetchData({
    isLoading: true,
    data: null,
    error: null
  })

  function handleReady() {
    fetchData({
      apiRoute: `/api/games/war/${game.id}/play`,
      method: "GET",
      isAuthRequired: true
    })
  }
  return (
    <>
      {game.status !== "created" &&
        game.gameplay.map((player) => (
          <figure key={player.id} className="player--cards">
            {player.event && <h3 className="player--event">{player.event}!</h3>}

            <img
              className="card--image"
              // src={`../img/${game.gameplay[player.id]}`}
              src={images["D2"]}
              alt={`Card belonging to ${player.name}:  A CARD`}
            />

            <figcaption className="player--name">
              {`${player.name}: ${player.showCards.join(", ")}`}
              <span className={player.ready && "ready"}>
                {player.ready && "Ready!"}
              </span>
            </figcaption>
            {player.id === user.id && (
              <>
                <button
                  onClick={handleReady}
                  disabled={player.ready}
                  className="ready--button"
                >
                  {player.ready ? "Waiting..." : "Ready"}
                </button>
              </>
            )}
          </figure>
        ))}
    </>
  )
}

export default War
