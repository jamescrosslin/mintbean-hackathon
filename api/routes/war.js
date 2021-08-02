const express = require('express');
const router = express.Router();

const { User, Game } = require('../models');

const { authenticateUser, asyncHandler, checkOwnership } = require('../middleware');

const { clientSubscribe, sendClientUpdates } = require('../controller/subscribe');

router.post('/ready', (req, res) => {
  console.log(req.game.id);
});

module.exports = router;
