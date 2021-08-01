const { Game } = require('../models');

function shuffle(cards) {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

const configureGame = {
  'War': (cards, players) => {
    const deck = shuffle(cards);
    console.log(deck);
  },
};

module.exports = {
  startGame: async (gameId) => {
    const game = await Game.findByPk(gameId);
    const deck = configureGame[game.typeOfGame](game.deck.cards, game.Users);
  },
};
