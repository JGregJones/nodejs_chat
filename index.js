var app = require('express')();                 // create app as function handler
var http = require('http').Server(app);         // create http server with express handler
var io = require('socket.io')(http);            // add socket IO to http server

app.get('/', function(req, res){                // handler for website home '/'
  // res.send('<h1>Hello world</h1>');             // Send Hello world 
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){           // log messages on connect/disconnect
    console.log('a user connected from ' + socket.handshake.address + ' on socket' + socket.id );
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    var room = 'lobby';  
    var name = 'Player';                       // Start in Lobby 
    socket.join(room);                       
    socket.on('chat message', function(msg){    // event 'chat message'
        console.log('message: '+ room + ":" + msg);         // log messages to console
        // io.to(room).emit('chat message', room + ": " + msg);  // broadcast to room
        io.to(room).emit('chat message', name + ": " + msg);  // broadcast to room
    });
    socket.on('broadcast', function(msg){    // event 'chat message'
      console.log("broadcast:" + msg);         // log messages to console
      // io.to(room).emit('chat message', room + ": " + msg);  // broadcast to room
      io.emit('chat message', name + ": " + msg);  // broadcast
    });
    socket.on('set room', function(newroom){       // event 'chat message'
        console.log("set room: leave " + room + " joining " + newroom);       // log messages to console
        socket.leave(room);
        room = newroom;
        socket.join(room);
        io.to(room).emit('chat message',"New user has joined " + room);
    });
    socket.on('set name', function(newname){       // event 'chat message'
    console.log("set name: old " + name + " new " + newname);       // log messages to console
    name = newname;
});
  });

http.listen(3000, function(){                   // Start website listener
  console.log('listening on *:3000');
});