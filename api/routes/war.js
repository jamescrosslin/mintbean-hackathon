const express = require('express');
const router = express.Router();

const { asyncHandler } = require('../middleware');

const { handleTurn } = require('../controller/play');
const { sendClientUpdates } = require('../controller/subscribe');

router.get('/turn', asyncHandler(handleTurn), sendClientUpdates, (req, res) => res.json('updated'));

module.exports = router;
