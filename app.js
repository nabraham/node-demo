var bodyParser = require('body-parser')
  , express = require('express')
  , expressJson = require('express-json')
  , math = require('./lib/routes/api/math')
  , swagger_node = require('swagger-node-express')
  , url = require('url');

var app = express();
app.use(expressJson());
app.use(bodyParser.urlencoded());
app.use('/swagger', express.static(__dirname + '/public/swagger'));

var swagger = swagger_node.createNew(app);
initRoutes(swagger);
startServer(app, swagger);

function initRoutes(swagger) {
    var hello_world = {
        spec: {
            description : 'simple GET example',
            path: '/api/helloworld',
            summary: 'returns {"hello":"world"}',
            paramters: [],
            nickname: 'helloworld'
        },
        action: function(req, res) {
            res.send({hello: 'world'});
        }
    };
    
    var fib_slow = {
        spec: {
            description: 'slow implementation of fibbonacci',
            path: '/api/math/fib_slow/{n}',
            notes: 'does not use dynamic programming',
            summary: 'returns nth fibbonacci term',
            parameters: [swagger.paramTypes.path('n', 'nth term to compute', 'Integer')],
            nickname: 'fib_slow'
        },
        action: math.fib_slow
    };

    var fib_fast = {
        spec: {
            description: 'fast implementation of fibbonacci',
            path: '/api/math/fib_fast/{n}',
            notes: 'does not use dynamic programming',
            summary: 'returns nth fibbonacci term',
            parameters: [swagger.paramTypes.path('n', 'nth term to compute', 'Integer')],
            nickname: 'fib_fast'
        },
        action: math.fib_fast
    };

    swagger.addGet(hello_world);
    swagger.addGet(fib_slow);
    swagger.addGet(fib_fast);
}

function startServer(app, swagger) {
    swagger.configureSwaggerPaths("", "/docs", "");
    swagger.configure('http://localhost:3000/','0.1');
    var server = app.listen(3000, function () {
        var host = server.address().address
        var port = server.address().port
        console.log('Example app listening at http://%s:%s', host, port)
    })
}
