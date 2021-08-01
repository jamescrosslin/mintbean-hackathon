import { useFetchData } from '../hooks';
import { useState } from 'react';

import ValidationErrors from './partials/ValidationErrors';
import { useHistory } from 'react-router-dom';

function CreateGame({ refreshGames, dismissForm }) {
  const { isLoading, data, error, fetchData } = useFetchData({
    isLoading: true,
    data: null,
    error: null,
  });
  const [formValues, setFormValues] = useState({});
  const history = useHistory();

  function handleFormChange(e) {
    setFormValues((prevState) => {
      return {
        // spread previous state to ensure persistence of form field values
        ...prevState,
        // whichever form field is the target of the change event will have its
        // name attribute used as a property on formValues and its value saved
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { maxPlayers, typeOfGame } = formValues;
    await fetchData({
      apiRoute: '/api/games/create',
      isAuthRequired: true,
      method: 'POST',
      body: {
        maxPlayers,
        typeOfGame,
      },
    });
    await refreshGames();
    dismissForm();
  }

  return (
    (!isLoading && data && (
      <>
        <span>Invite link: {data.message}</span>
      </>
    )) || (
      <div className="wrap">
        {/* displays validation errors when they exist */}
        {error?.errors && <ValidationErrors error={error} />}
        <form onSubmit={handleSubmit}>
          {
            //put popup overlay here
          }
          <label htmlFor="typeOfGame">Type of Game: </label>
          <select id="typeOfGame" name="typeOfGame" onChange={handleFormChange}>
            <option value="">Select a Game</option>
            <option value="War">War</option>
            <option value="WarPlus">WarPlus</option>
          </select>
          <label htmlFor="maxPlayers">Number of Players: </label>
          <select id="maxPlayers" name="maxPlayers" onChange={handleFormChange}>
            <option value="">-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button type="submit">Submit</button>
          <button type="button" onClick={dismissForm}>
            Cancel
          </button>
        </form>
      </div>
    )
  );
}
export default CreateGame;
