// Node.js chat server
// Greg Jones 9/6/2018
// Inspried by example at https://socket.io/get-started/chat


var app = require('express')();                 // create express app
var http = require('http').Server(app);         // create http server with express handler
var io = require('socket.io')(http);            // add socket IO to http server

app.get('/', function(req, res){                // handler for website home '/'
  // res.send('<h1>Hello world</h1>');          // Original example was Hello world 
  res.sendFile(__dirname + '/index.html');      // Simply send index.html to client
});

io.on('connection', function(socket){           // Socket I/O handler
    console.log('a user connected from ' + socket.handshake.address + ' on socket' + socket.id );
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    var name = 'Player';                        // default player name
    var room = 'lobby';                         // default room is lobby
    socket.join(room);   

    socket.on('chat message', function(msg){
      console.log('message: '+ room + ":" + msg);
      io.to(room).emit('chat message', name + ": " + msg);
    });

    socket.on('broadcast', function(msg){
      console.log("broadcast:" + msg);
      io.emit('chat message', name + ": " + msg);  // broadcast
    });

    socket.on('set room', function(newroom){
      console.log("set room: leave " + room + " joining " + newroom);
      socket.leave(room);
      room = newroom;
      socket.join(room);
      io.to(room).emit('chat message', name + " has joined " + room);
    });

    socket.on('set name', function(newname){
      console.log("set name: old " + name + " new " + newname);
      name = newname;
    });

  });

http.listen(3000, function(){                   // Start website listener
  console.log('listening on *:3000');
});