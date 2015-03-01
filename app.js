var bodyParser = require('body-parser')
  , express = require('express')
  , expressJson = require('express-json')
  , expressWinston = require('express-winston')
  , swagger_node = require('swagger-node-express')
  , swaggerResources = require('./swaggerResources.js')
  , url = require('url')
  , winston = require('winston');

var app = express();
app.use(expressJson());
app.use(bodyParser.urlencoded());
app.use('/swagger', express.static(__dirname + '/public/swagger'));
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            colorize: true
        })
        //transports can be custom functions, built in, or user supported: 
        //file, http, mongoDB, couchDB, mysql, loggly, redis, mail
    ]
}));

var swagger = swagger_node.createNew(app);
swaggerResources.addRoutes(swagger);
startServer(app, swagger);

function startServer(app, swagger) {
    swagger.configureSwaggerPaths("", "/docs", "");
    swagger.configure('http://localhost:3000/','0.1');
    var server = app.listen(3000, function () {
        var host = server.address().address
        var port = server.address().port
        console.log('Example app listening at http://%s:%s', host, port)
    })
}
