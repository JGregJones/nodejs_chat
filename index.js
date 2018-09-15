var app = require('express')();                 // create app as function handler
var http = require('http').Server(app);         // create http server with express handler
var io = require('socket.io')(http);            // add socket IO to http server

app.get('/', function(req, res){                // handler for website home '/'
  // res.send('<h1>Hello world</h1>');             // Send Hello world 
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){           // log messages on connect/disconnect
    console.log('a user connected from ' + socket.handshake.address);
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){    // event 'chat message'
        console.log('message: ' + msg);         // log messages to console
        io.emit('chat message', msg);           // broadcast to everyone
    });
  });

http.listen(3000, function(){                   // Start website listener
  console.log('listening on *:3000');
});