var router = require('express').Router();
var controller = require('./taskController');

// Get ID information when using /:id route
router.param('id', controller.params);
router.param('user', controller.paramsbyUser);


// POST new exercises
router.route('/')
  .post(controller.post)

// GET all taks
router.route('/')
  .get(controller.get)

// GET, PUT and DELETE exercises
router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

router.route('/user/:user')
  .get(controller.getbyUser)

module.exports = router;
