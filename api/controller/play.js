const { User, Game } = require('../models');

function shuffle(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const computer = { id: 'computer', firstName: 'computer', ready: true };

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
      const playerObj = {
        id: player.id,
        deck: shuffledCards.slice(start, finish),
        name: player.firstName,
        showCards: [],
        hiddenCards: [],
        event: null,
        ready: false,
      };
      if (player.id === 'computer') playerObj.ready = true;
      return playerObj;
    });
    return gameplay;
  },
  'WarPlus': function (deck, players) {
    return this.War(deck, players);
  },
};

const turnAction = {
  'War': function (game, user) {
    const { gameplay } = game;
    const playerObj = gameplay.find(({ id }) => id === user.id);
    playerObj.ready = true;
    const everyPlayerReady = gameplay.every(({ ready }) => ready);
    let playersWithCardsLeft = gameplay.filter((player) => {
      if (!player.deck.length) {
        player.event = 'Out of Cards';
        player.ready = true;
      }
      return player.deck.length > 0;
    });

    if (everyPlayerReady) {
      const prevWinner = gameplay.find((player) => player.event === 'Winner');
      if (prevWinner) {
        gameplay.forEach((player) => {
          prevWinner.deck.push(...player.showCards, ...player.hiddenCards);
          player.showCards = [];
          player.hiddenCards = [];
        });
      }

      playersWithCardsLeft.forEach((player) => {
        player.event = null;
        if (player.id !== 'computer') player.ready = false;
        if (player.deck.length > 0) player.showCards.unshift(player.deck.shift());
      });
      const cardValues = playersWithCardsLeft.map((player) => +player.showCards[0].slice(1));
      const areUnique = new Set(cardValues).size === cardValues.length;
      playersWithCardsLeft = gameplay.filter((player) => {
        const numberToBeat = areUnique ? 1 : 4;
        if (player.deck.length < numberToBeat) player.event = 'Out of Cards';
        return player.deck.length >= numberToBeat;
      });
      if (!areUnique && playersWithCardsLeft.length > 1) {
        cardValues.forEach((val, i, arr) => {
          if (arr.indexOf(val) !== arr.lastIndexOf(val)) {
            const player = playersWithCardsLeft[i];
            player.event = 'War';
            for (let i = 0; i < 4; i++) {
              player.hiddenCards.unshift(player.deck.shift());
            }
          }
        });
      } else if (playersWithCardsLeft.length > 1) {
        const winnerIndex = cardValues.indexOf(Math.max(...cardValues));
        playersWithCardsLeft[winnerIndex].event = 'Winner';
      }
    }
    if (playersWithCardsLeft.length === 1) {
      gameplay.status = 'completed';
      playersWithCardsLeft[0].event = 'Big Winner';
      gameplay.map((player) => (player.ready = true));
    }
    return gameplay;
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
  handleTurn: async (req, res, next) => {
    const gameplay = turnAction[req.game.typeOfGame](req.game, req.currentUser);
    const update = await Game.update({ gameplay }, { where: { id: req.game.id } });
    console.log('updated games: ', update);
    next();
  },
};
