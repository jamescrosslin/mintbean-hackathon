const { User, Game } = require('../models');

function shuffle(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const computer = { id: 'computer', firstName: 'computer' };

const configureGame = {
  'War': function (deck, players) {
    if (players.length === 1) players = [...players, computer];
    const shuffledCards = shuffle(deck.cards);
    const shuffledPlayers = shuffle(players);
    const gameplay = shuffledPlayers.map((player, i, arr) => {
      const distribution = Math.floor(shuffledCards.length / arr.length);
      const remainder = shuffledCards.length % arr.length;
      const start = i * distribution;
      const finish = (i + 1) * distribution + (remainder && i >= arr.length - remainder ? 1 : 0);
      return {
        id: player.id,
        deck: shuffledCards.slice(start, finish),
        name: player.firstName,
        showCards: [],
        hiddenCards: [],
        event: null,
        ready: false,
      };
    });
    console.log(gameplay);
    return gameplay;
  },
  'WarPlus': function (deck, players) {
    return this.War(deck, players);
  },
};

module.exports = {
  startGame: async (gameId) => {
    try {
      const game = await Game.findOne({ where: { id: gameId }, include: [{ model: User }] });
      console.log('game.gameplay: ', game.gameplay);
      const gameplay = configureGame[game.typeOfGame](game.gameplay, game.Users);
      await game.update({ gameplay, status: 'ongoing' });
    } catch (err) {
      console.log(err);
    }
  },
};
