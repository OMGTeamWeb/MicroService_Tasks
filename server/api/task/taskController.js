var Task = require('./taskModel');
var _ = require('lodash');

exports.params = function(req, res, next, id, userId) {
  Task.findById(id)
    .then(function(task) {
      if (!task) {
        next(new Error('There is no task with that id'));
      } else {
        req.task = task;
        next();
      }
    },function(err) {
      next(err);
    });
};
exports.paramsbyUser = function(req, res, next, userId) {
  Task.find({"userId": userId})
    .then(function(task) {
      console.log("HOLIs");
      if (!task) {
        next(new Error('There is no task with that id'));
      } else {
        console.log(":O "+ task);
        req.userId = task;
        next();
      }
    },function(err) {
      next(err);
    });
};

exports.getbyUser = function(req, res, next){
  console.log("USERID "+ req.userId);
  var task = req.userId;
  res.json(task);
}

exports.get = function(req, res, next) {
  Task.find()
    .then(function(tasks){
      res.json(tasks);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var task = req.task;
  res.json(task);
};



exports.put = function(req, res, next) {
  console.log("WOW "+ req.task);
  var task = req.task;

  var update = req.body;

  _.merge(task, update);

  task.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};



exports.post = function(req, res, next) {
  var newTask = req.body;

  Task.create(newTask)
    .then(function(task) {
      res.json(task);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.task.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
