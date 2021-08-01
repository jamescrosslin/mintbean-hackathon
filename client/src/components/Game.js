import { Link } from 'react-router-dom';

function Game({ typeOfGame, id }) {
  return (
    // Link component redirects to course based on id
    <Link to={`/games/${id}`} className="course--module course--link">
      <h2 className="course--label">Game</h2>
      <h3 className="course--title">{typeOfGame}</h3>
    </Link>
  );
}
export default Game;
