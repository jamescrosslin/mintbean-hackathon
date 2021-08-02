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
      <div className="modal--wrapper">
        {/* displays validation errors when they exist */}
        {error?.errors && <ValidationErrors error={error} />}
        <form onSubmit={handleSubmit} className="modal">
          {
            //put popup overlay here
          }
          <label htmlFor="typeOfGame" className="modal--label">
            Type of Game:
            <select
              id="typeOfGame"
              name="typeOfGame"
              onChange={handleFormChange}
              className="modal--select"
            >
              <option value="">Select a Game</option>
              <option value="War">War</option>
              <option value="WarPlus">WarPlus</option>
            </select>
          </label>

          <label htmlFor="maxPlayers" className="modal--label">
            Number of Players:
            <select
              id="maxPlayers"
              name="maxPlayers"
              onChange={handleFormChange}
              className="modal--select"
            >
              <option value="">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>

          <button type="submit" className="modal--submit--btn">
            Submit
          </button>
          <button type="button" onClick={dismissForm} className="modal--cancel--btn">
            Cancel
          </button>
        </form>
      </div>
    )
  );
}
export default CreateGame;
