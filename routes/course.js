'use strict'
var express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
var { Course } = require('../models').Course;
const { authenticateUser } = require('../middleware/authenticate-user');

var router = express.Router();

/*/api/courses GET route that will return all courses including the User associated with 
each course and a 200 HTTP status code.*/


router.get('/courses', 
  asyncHandler(async(req, res) => {
    const course = await Course.findAll();
    res.status(200);
  }));

//   A /api/courses/:id GET route that will return the corresponding 
// course including the User associated with that course 
// and a 200 HTTP status code.

  router.get('/courses/:id', 
   asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id);
    res.status(200);
  }));

//   A /api/courses POST route that will create a new course, 
// set the Location header to the URI for the newly created course,
//  and return a 201 HTTP status code and no content.

  router.post('/courses/',
    authenticateUser,
    asyncHandler(async(req, res) => {
    try {
        await Course.create(req.body);
        res.status(201).location(`/courses/${course.id}`).end();
    } catch (error){
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
          } else {
            throw error;
          }
    }
  }));

//   A /api/courses/:id PUT route that will update the corresponding course 
// and return a 204 HTTP status code and no content.

  router.put('/courses/:id',
    authenticateUser,
    asyncHandler(async(req, res) => {
    let course;
    course = await Course.findByPk(req.params.id);
    try{
        await course.update(req.body);
        res.status(204);
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
        } else {
        throw error;
        }
    }
  }));

  /*A /api/courses/:id DELETE route that will delete the corresponding course 
  and return a 204 HTTP status code and no content.*/
  router.delete('/courses/:id',
  authenticateUser,
    asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id);
    try{
        await course.destroy();
        res.status(204);
    } catch (error){

    }
  }));

  module.exports = router;



