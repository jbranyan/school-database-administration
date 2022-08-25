'use strict'

var express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
var { User } = require('../models');
const { authenticateUser } = require('../middleware/authenticate-user');

const router = express.Router();

/* GET route will authenticate the user and respond with the current
authorized user's information
*/

router.get('/users',
  authenticateUser,
  asyncHandler(async(req, res) => {
    const user = req.currentUser;
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    });
  }));

/*POST route that will create a new user */

  router.post('/users',
    asyncHandler(async(req, res) => {
      await User.create(req.body);
      res.status(201).location('/').end();
  }));

  module.exports = router;

