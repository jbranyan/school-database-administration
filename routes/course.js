var express = require('express');
var router = express.Router();
var { Course } = require('../models').Course;


/*/api/courses GET route that will return all courses including the User associated with 
each course and a 200 HTTP status code.*/


router.get('/courses', async function(req, res) {
    const course = await Course.findAll();
    res.status(200);
    // res.json({
    //     title: Course.title,
    //     description: Course.description,
    //     estimatedTime: Course.estimatedTime,
    //     materialsNeeded: Course.materialsNeeded
    // });
  }); 

//   A /api/courses/:id GET route that will return the corresponding 
// course including the User associated with that course 
// and a 200 HTTP status code.

  router.get('/courses/:id', async function(req, res){
    const course = await Course.findByPk(req.params.id);
    res.status(200);
    
  });

//   A /api/courses POST route that will create a new course, 
// set the Location header to the URI for the newly created course,
//  and return a 201 HTTP status code and no content.

  router.post('/courses/', async function(req, res){
    try {
        await Course.create(req.body);
        res.location('/courses/:id');
        res.status(201);
    } catch (error){
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
          } else {
            throw error;
          }
    }
  });

//   A /api/courses/:id PUT route that will update the corresponding course 
// and return a 204 HTTP status code and no content.

  router.put('/courses/:id', async function(req, res){
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
  });

  /*A /api/courses/:id DELETE route that will delete the corresponding course 
  and return a 204 HTTP status code and no content.*/
  router.delete('/courses/:id', async function(req, res){
    const course = await Course.findByPk(req.params.id);
    try{
        await course.destroy();
        res.status(204);
    } catch (error){

    }
  });

  module.exports = router;



