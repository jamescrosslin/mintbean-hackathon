const { User, Game } = require('../models');
const { authenticateUser, asyncHandler } = require('../middleware');
const express = require('express');
const router = express.Router();

const { startGame } = require('../controller/play');
const { clientSubscribe, sendClientUpdates } = require('../controller/subscribe');
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

router.param('gameId', async (req, res, next, id) => {
  // any routes with :gameId will have this function run
  try {
    const game = await Game.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
    req.game = game;
    next();
  } catch (err) {
    err.message = 'Game does not exist';
    err.status = 404;
    next(err);
  }
});

router.get('/subscribe/:gameId', clientSubscribe);

router.use(authenticateUser); // authenticates users for every following route in this module

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const games = await req.currentUser.getGames({ include: [{ model: User }] });
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

    req.game = game;

    res.redirect(`/api/games/join/${game.id}`);
  }),
);

router.use(
  '/join/:gameId',
  asyncHandler(async (req, res, next) => {
    const {
      currentUser,
      game: { id, maxPlayers, Users },
    } = req;

    const spaceAvailable = maxPlayers >= Users.length + 1;
    if (!spaceAvailable) {
      const err = new Error();
      err.message = `This game is full`;
      err.status = 401;
      throw err;
    }

    const didAddUser = await req.game.addUser(currentUser);
    if (didAddUser && maxPlayers === Users.length + 1) await startGame(id);

    next();
  }),
  sendClientUpdates,
  (req, res) => res.json({ message: `${clientUrl}/games/join/${req.game.id}` }),
);
const warRoutes = require('./war');
router.use('/war/:gameId', warRoutes);

module.exports = router;
