import { Link, NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function Header() {
  const { user } = useUserContext();
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">WarPlus</Link>
        </h1>
        <nav>
          <ul className={`header--${user.firstName ? 'signedin' : 'signedout'}`}>
            {
              /* will only display welcome message if user is signed in */
              (user.username && (
                <>
                  <li>Welcome, {`${user.firstName} ${user.lastName}`}!</li>
                  <li>
                    <Link to="/signout">Sign Out</Link>
                  </li>
                </>
              )) || (
                <>
                  <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signin">Sign In</NavLink>
                  </li>
                </>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
