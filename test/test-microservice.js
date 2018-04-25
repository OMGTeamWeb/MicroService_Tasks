var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../server/server');
var Task = require('../server/api/task/taskModel');

var should = chai.should();
chai.use(chaiHttp);

describe('Task', function() {

  beforeEach(function(done){
    var newTask = new Task({
      userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      title: 'Finish test integration',
      description: 'Save the day with my test integration',
      dueDate: '2018-05-01',
      reminder: '2018-04-30'
    });
    newTask.save(function(err) {
      done();
    });
  });

  afterEach(function(done){
    Task.collection.drop();
    done();
  });

  it('should get all tasks for user "d290f1ee-6c54-4b01-90e6-d701748f0851"', function(done) {
    chai.request(server)
      .get('/api/task/user/d290f1ee-6c54-4b01-90e6-d701748f0851')
      .end(function(err, res){
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].userId.should.equal('d290f1ee-6c54-4b01-90e6-d701748f0851');
        done();
      });
  });

  it('should add a new TASK on /api/task POST', function(done) {
    chai.request(server)
      .post('/api/task')
      .send({ userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
              title: 'New Homework',
              description: 'Important and funny homework',
              dueDate: '2018-05-02',
              reminder: '2018-05-01'
            })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        res.body.should.have.property('dueDate');
        res.body.should.have.property('reminder');
        done();
      });
  });

  it('should update a task for user "d290f1ee-6c54-4b01-90e6-d701748f0851"', function(done) {
    chai.request(server)
      .get('/api/task/user/d290f1ee-6c54-4b01-90e6-d701748f0851')
      .end(function(err, res){
        chai.request(server)
        .put('/api/task/'+res.body[0]._id)
        .send({ "title": "Estoy salvando el semestre :)"})
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.title.should.equal('Estoy salvando el semestre :)');
          done();
        });
      });
  });

  it('should DELETE an task for user "d290f1ee-6c54-4b01-90e6-d701748f0851"', function(done) {
    chai.request(server)
      .get('/api/task/user/d290f1ee-6c54-4b01-90e6-d701748f0851')
      .end(function(err, res){
        chai.request(server)
        .delete('/api/task/'+res.body[0]._id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });
      });
  });
});
