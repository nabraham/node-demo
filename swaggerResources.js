var math = require('./lib/routes/api/math')
  , swagger_node = require('swagger-node-express');

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
        parameters: [swagger_node.paramTypes.path('n', 'nth term to compute', 'Integer')],
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
        parameters: [swagger_node.paramTypes.path('n', 'nth term to compute', 'Integer')],
        nickname: 'fib_fast'
    },
    action: math.fib_fast
};

exports.addRoutes = function(swagger) {
    swagger.addGet(hello_world);
    swagger.addGet(fib_slow);
    swagger.addGet(fib_fast);
};
    
