const express = require('express');
const router = express.Router();

const { User, Game } = require('../models');

const { authenticateUser, asyncHandler, checkOwnership } = require('../middleware');

const { clientSubscribe, sendClientUpdates } = require('../controller/subscribe');

router.get(
  '/play',
  asyncHandler(async (req, res) => {
    console.log('inside war: ', req.game.id);
    res.json({ message: 'turn played' });
  }),
);

module.exports = router;
