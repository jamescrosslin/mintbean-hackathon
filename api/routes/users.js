const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { authenticateUser, asyncHandler } = require('../middleware');

router
  // the following chained methods will all belong to the '/' path
  .route('/')
  .get(
    authenticateUser,
    asyncHandler(async (req, res) => {
      // find User by primary key
      const user = await User.findByPk(req.currentUser.id, {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });
      res.json(user);
    }),
  )
  .post(
    asyncHandler(async (req, res) => {
      /* 
        here we're destructuring unique props from req.body instead of spreading
        all of req.body to prevent malicious activity through
        unanticipated props like aggregating functions
      */
      const { firstName, lastName, emailAddress, password } = req.body;
      await User.create({ firstName, lastName, emailAddress, password });
      res.location('/').status(201).send();
    }),
  );

module.exports = router;
