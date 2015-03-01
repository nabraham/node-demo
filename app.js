var express = require('express')
  , math = require('./lib/routes/api/math');

var app = express();
initRoutes(app);
startServer(app);

function initRoutes(app) {
    app.get('/api/helloworld', function(req, res) {
        res.send({hello: 'world'});
    });

    app.get('/api/math/fib_fast/:n', math.fib_fast);
    app.get('/api/math/fib_slow/:n', math.fib_slow);
}

function startServer(app) {
    var server = app.listen(3000, function () {

        var host = server.address().address
        var port = server.address().port

        console.log('Example app listening at http://%s:%s', host, port)

    })
}
