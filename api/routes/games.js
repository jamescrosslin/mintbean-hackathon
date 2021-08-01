const { User, Game } = require('../models');
const { authenticateUser, asyncHandler, checkOwnership } = require('../middleware');
const express = require('express');
const router = express.Router();

const { clientSubscribe, sendClientUpdates } = require('../controller/subscribe');

router.param('gameId', async (req, res, next, id) => {
  // any routes with :gameId will have this function run
  try {
    const game = await Game.findOne({
      where: {
        id,
      },
      include: [{ model: User }],
    });
    req.game = game;
    next();
  } catch (err) {
    err.message = 'Game does not exist';
    err.status = 404;
    next(err);
  }
});

router.get('/play/:gameId', clientSubscribe);

router.use(authenticateUser); // authenticates users for every following route in this module

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const games = await req.currentUser.getGames();
    res.json({ games });
  }),
);

router.post(
  '/create',
  asyncHandler(async (req, res, _next) => {
    const { maxPlayers, typeOfGame } = req.body;
    const game = await Game.create({
      maxPlayers,
      typeOfGame,
    });
    await game.addUser(req.currentUser);

    const gamePlusUsers = await Game.findOne({
      where: { id: game.id },
      include: [{ model: User }],
    });

    res.status(201).json({ message: `http://localhost:3000/join/${game.id}` });
  }),
);

router.get(
  '/join/:gameId',
  asyncHandler(async (req, res, next) => {
    const {
      currentUser,
      game: { maxPlayers, Users },
    } = req;

    const spaceAvailable = maxPlayers >= Users.length + 1;
    if (!spaceAvailable) {
      const err = new Error();
      err.message = `This game is full`;
      err.status = 401;
      throw err;
    }

    await req.game.addUser(currentUser);

    next();
  }),
  sendClientUpdates,
  (req, res) => res.json({ message: 'Joined the game' }),
);

module.exports = router;
