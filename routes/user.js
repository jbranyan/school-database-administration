var express = require('express');
var { User } = require('../models').User;
const { authenticateUser } = require('./middleware/auth-user');
const router = express.Router();

// A /api/users GET route that will return all properties and 
// values for the currently authenticated User along with a 
// 200 HTTP status code.

router.get('/api/users',
  authenticateUser,
  async function(req, res) {
  const user = await User.findAll();
  res.status(200);
    // res.json({
    //   userId: User.userId,
    //   firstName: User.firstName,
    //   lastName: User.lastName,
    //   emailAddress: User.emailAddress,
    //   username: User.username
    // });
  });

  // A /api/users POST route that will create a new user, set 
// the Location header to "/", and return a 201 HTTP status 
// code and no content.

// When a new user is created using the /api/users POST route the application 
// should include validation to ensure that the following required values are 
// properly submitted in the request body:
// firstName
// lastName
// emailAddress
// password

  router.post('/api/users', async function(req, res){
    try{
      await User.create(req.body);
      res.location('/');
      res.status(201);
    } catch (error){
      if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  });

  module.exports = router;

