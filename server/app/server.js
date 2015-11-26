var express = require('express');
var app = express();
var server = require('http').createServer(app);

var port = process.env.PORT || 8000;
// var io = require('socket.io')(server);
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

var OpenRouter = express.Router(); //unpriveleged
// var ClosedRouter = express.Router(); //priveleged

var DecorateOpenRouter = require('./OpenRouter.js');
// var DecorateClosedRouter = require('./ClosedRouter.js');

// DecorateClosedRouter(expressRouter);

app.use('/',OpenRouter);
DecorateOpenRouter(OpenRouter);
server.listen(port);
require('./config/middleware/Middleware.js')(app, express);
app.use(express.static(__dirname + '../../../client/app/'));








// var currentUsersInRoom = {};

// io.on('connection', function (socket) {

//   socket.on('connectToRoom', function (room) {
//     var currentRoom = room;
//     socket.join(currentRoom);

//     socket.on('userData', function (user) {
//       var singleUser = {};
//       singleUser[user.id] = user;
//       currentUsersInRoom[currentRoom] = singleUser;
//       io.in(currentRoom).emit('serverData', currentUsersInRoom);
//     });

//     socket.on('logout', function (user) {
//       delete currentUsersInRoom[currentRoom][user.id];
//       socket.leave(currentRoom);
//       io.in(currentRoom).emit('serverData', currentUsersInRoom);
//     })
//   });
// });

module.exports = app;