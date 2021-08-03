const express = require('express');
const router = express.Router();

const { User, Game } = require('../models');

const { authenticateUser, asyncHandler, checkOwnership } = require('../middleware');

const { handleTurn } = require('../controller/play');
const { clientSubscribe, sendClientUpdates } = require('../controller/subscribe');


router.get('/play', asyncHandler(handleTurn), sendClientUpdates, (req, res) => res.json('updated'));

module.exports = router;
