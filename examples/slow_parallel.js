var async = require('async')
  , colors = require('colors')
  , math = require('../lib/routes/api/math')
  , moment = require('moment');

function createTasks(nTasks, fibTerm) {
    var tasks = [];
    for (var i=0; i<nTasks; i++) {
        tasks.push(createTask(fibTerm));
    }
    return tasks;
}

function createTask(fibTerm) {
    var mockReq = {params : {n : fibTerm}};

    var mockRes = function(cb) {
        return {send: function(r) { cb(null, r); }};
    };

    return function(cb) {
        math.fib_slow(mockReq, mockRes(cb));
    };
}

var argv = require('minimist')(process.argv.slice(2));
var tasks = createTasks(argv.nTasks, argv.fibTerm);

var start = moment();
async.parallel(tasks, function(err, res) {
    var end = moment();
    var msg = ('Finished ' + tasks.length + ' tasks in ').green + 
        ('' + end.diff(start) + 'ms').magenta; 
    console.log(msg)
    console.log(JSON.stringify(res).substring(0,50) + '...');
});
