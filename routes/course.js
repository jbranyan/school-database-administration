'use strict'
var express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
var { Course, User } = require('../models');
const { authenticateUser } = require('../middleware/authenticate-user');

var router = express.Router();

/*GET route that will return all courses including the User associated with
each course */

router.get('/courses',
  asyncHandler(async(req, res) => {
    const course = await Course.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
      include: [{
        model: User
      }
    ],
    });
    res.status(200).json(course);
  }));

/*GET route that will return the corresponding
 course including the User associated with that course
*/

  router.get('/courses/:id',
   asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
      include: [{
        model: User
      }
    ],
  });
    res.status(200).json(course);
  }));

/* POST route that will create a new course
*/

  router.post('/courses/',
    authenticateUser,
    asyncHandler(async(req, res) => {
      const course = await Course.create(req.body);
      res.status(201).location(`/courses/${course.id}`).end();
  }));

//   A /api/courses/:id PUT route that will update the corresponding course 
// and return a 204 HTTP status code and no content.

  router.put('/courses/:id',
    authenticateUser,
    asyncHandler(async(req, res) => {

      const user = req.currentUser;
      let message;

      const course = await Course.findByPk(req.params.id);

      if(course.userId === user.id){
        await course.update(req.body);
        res.status(204).end();
      } else {
        message = 'User not authorized to update course';
      }

      if(message){
        res.status(403).json({errors: message}).end();
      }
  }));

  /*A /api/courses/:id DELETE route that will delete the corresponding course 
  and return a 204 HTTP status code and no content.*/
  router.delete('/courses/:id',
  authenticateUser,
    asyncHandler(async(req, res) => {
    const user = req.currentUser;
    let message;

    let course = await Course.findByPk(req.params.id);

      if(course.userId === user.id){
        await course.destroy();
        res.status(204).end();
      } else {
        message = 'User not authorized to delete course';
      }

      if(message){
        res.status(403).json({errors: message}).end();
      }
  }));

  module.exports = router;



