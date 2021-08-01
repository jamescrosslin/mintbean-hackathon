import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <>
      <h1>Welcome to the WarPlus app!</h1>
      <p>Let's go to your game page and play some games!</p>
      <Link to="/games">{'My Games ->'}</Link>
    </>
  );
}

export default Home;
