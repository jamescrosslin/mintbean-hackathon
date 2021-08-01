const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
  /*
    acts as a wrapper for route handlers to 
    reduce try catch block noise in routes
  */
  asyncHandler: (cb) => {
    return async (req, res, next) => {
      try {
        return await cb(req, res, next);
      } catch (err) {
        // checks for user input related errors
        if (
          err.name === 'SequelizeValidationError' ||
          err.name === 'SequelizeUniqueConstraintError'
        ) {
          // creates user facing error messages
          err.validationErrors = err.errors.map((err) => err.message);
          err.status = 400;
          err.message = 'Submission was invalid.';
        }
        // pass along error to global error handler
        return next(err);
      }
    };
  },
  authenticateUser: async (req, res, next) => {
    let message;
    try {
      // Parse the user's credentials from the Authorization header.
      const credentials = auth(req);
      // If the user's credentials are available...
      if (credentials) {
        // Attempt to retrieve the user from the data store
        // by their emailAddress (i.e. the user's "key"
        // from the Authorization header).
        const user = await User.findOne({ where: { emailAddress: credentials.name } });
        // If a user was successfully retrieved from the data store...
        if (user) {
          // Use the bcrypt npm package to compare the user's password
          // (from the Authorization header) to the user's password
          // that was retrieved from the data store.
          const match = bcrypt.compareSync(credentials.pass, user.password);
          // If the passwords match...
          if (match) {
            // Store the retrieved user object on the request object
            // so any middleware functions that follow this middleware function
            // will have access to the user's information.
            req.currentUser = user;
          } else {
            message = `Authentication failed for email: ${user.emailAddress}`;
          }
        } else {
          message = `User not found for email: ${credentials.name}`;
        }
      } else {
        // If user authentication failed...
        // Return a response with a 401 Unauthorized HTTP status code.
        message = 'Auth header not found';
      }
      if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
      } else {
        // Or if user authentication succeeded...
        // Call the next() method.
        next();
      }
    } catch (err) {
      next(err);
    }
  },
  checkOwnership: (req, res, next) => {
    // checks if the logged in user is interacting with a course assigned to them
    if (req.currentUser.id !== req.course.userId) {
      const error = new Error('Authorization Error');
      error.errors = error.errors || [];
      error.errors.push("Cannot modify another user's course");
      error.status = 403;
      throw error;
    } else {
      next();
    }
  },
};
