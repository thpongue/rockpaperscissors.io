var express = require('express');
var path = require('path');
var app = express();
var uuid = require('uuid');
var games = {};


// notes
// 1st user goes to site
// gets redirected to game id
// connects to our socket server passing this id
// we put it into game.unique_id.players at position 0



// -------------------------------------
// server
// -------------------------------------

// redirect default request to a have a new game id
app.get('/', function(request, response, next) {
	var game_id = request.query.game_id;
	if (!game_id) {
		game_id = uuid.v4();
		response.redirect('?game_id='+game_id);
	} else {
		if (!games[game_id]) {
			games[game_id] = {
				players: []
			};
		}
		next();
	}
});

// 
app.use(express.static('build/static'));

// 
var server = app.listen(8001, function () {
  var host = server.address().address;
  var port = server.address().port;
});


// -------------------------------------
// socket io
// -------------------------------------

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	console.log("connection made");
	console.log(socket.id);
  socket.on('game update', function(msg){
		console.log("game update");
    io.emit('game update', msg);
  });
  socket.on('disconnect', function(msg){
		console.log("disconnected");
		console.log(socket.id);
  });
});

io.on('disconnection', function(socket){
	console.log("disconnect");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
