var express = require('express');
var app = express();
var server = require('http').createServer(app);

var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
// var io = require('socket.io')(server);
// var cookieParser = require('cookie-parser');

var OpenRouter = express.Router(); //unpriveleged
// var ClosedRouter = express.Router(); //priveleged

var DecorateOpenRouter = require('./OpenRouter.js');
// var DecorateClosedRouter = require('./ClosedRouter.js');

// DecorateClosedRouter(expressRouter);
app.use(bodyParser.json());
app.use(express.static(__dirname + '../../../client/'));
app.use('/',OpenRouter);
DecorateOpenRouter(OpenRouter);
server.listen(port);
require('./config/middleware/Middleware.js')(app, express);

console.log("Server listening on port: ",port)

module.exports = app;
