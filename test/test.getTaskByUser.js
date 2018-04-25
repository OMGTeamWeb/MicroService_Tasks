// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var mongoose = require("mongoose");
// var server = require('../server/server');
// var Task = require('../server/api/task/taskModel');
//
// var should = chai.should();
// chai.use(chaiHttp);
//
// describe('Task', function() {
//
//   beforeEach(function(done){
//     var newTask = new Task({
//       userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
//       title: 'Finish test integration',
//       description: 'Save the day with my test integration',
//       dueDate: '2018-05-01',
//       reminder: '2018-04-30'
//     });
//     newTask.save(function(err) {
//       done();
//     });
//   });
//
//   afterEach(function(done){
//     Task.collection.drop();
//     done();
//   });
//
//
//   it('should RETURN 404 user not found passing false id', function(done) {
//     chai.request(server)
//       .get('/api/task/user/1')
//       .end(function(err, res){
//         console.log(res.body)
//         res.should.have.status(404);
//           done();
//       });
//   });
// });
