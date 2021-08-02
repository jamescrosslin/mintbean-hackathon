import { Link } from 'react-router-dom';

function Game({ typeOfGame, id, maxPlayers, Users }) {
  return (
    // Link component redirects to course based on id
    <Link to={`/games/${id}`} className="course--module course--link">
      <h2 className="course--label">
        {maxPlayers} Players: {Users.map((user) => user.firstName).join(', ')}
      </h2>
      <h3 className="course--title">{typeOfGame}</h3>
    </Link>
  );
}
export default Game;
