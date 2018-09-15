=== 9/6/2018 - Greg Jones
Socket.IO example pulled from: https://socket.io/get-started/chat

will need to install express and socket.io to use this code

npm install --save express@4.15.2 
This is a webserver framework that helps with routing 
See: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
Claims it's the most popular Node web framework - and other frameworks build on it.
Provides handlers for other HTTP Verbs (GET,POST, DELETE)
Running this command installed a ton of packages in subdir node_modules and
created package-lock.json.   The console also had several warnings:
C:\Users\Greg\Documents\Greg\Src\nodejs_chat>npm install --save express@4.15.2
npm WARN notice [SECURITY] fresh has the following vulnerability: 1 high. Go here for more details: https://nodesecurity.io/advisories?search=fresh&version=0.5.0 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
npm WARN notice [SECURITY] debug has the following vulnerability: 1 low. Go here for more details: https://nodesecurity.io/advisories?search=debug&version=2.6.1 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
npm WARN notice [SECURITY] mime has the following vulnerability: 1 moderate. Go here for more details: https://nodesecurity.io/advisories?search=mime&version=1.3.4 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN socket-chat-example@0.0.1 No repository field.
npm WARN socket-chat-example@0.0.1 No license field.

Created index.js and now have working hello world website, using simple res.send
Then added index.html file that setup html document for chat window and used res.sendFile

npm install --save socket.io
C:\Users\Greg\Documents\Greg\Src\nodejs_chat>npm install --save socket.io
npm WARN socket-chat-example@0.0.1 No repository field.
npm WARN socket-chat-example@0.0.1 No license field.

+ socket.io@2.1.1
added 42 packages in 3.763s

Added code to index.js to load the socket io and attach it to http
Added handler in index.js to process new connections and print message
This code is running in nodejs server

Added code to index.html to load the socket IO library and setup var socket = io() 
This code is running in the brower

Added code to log message on connect/disconnect 
TODO - understand that odd syntax - some form of chaining

Added html code in client to send message on submet
Added message handler in index.js to process message
Added html code to process incoming message
Added server code to broadcast message to everyone.

=== 9/15/2018 - How do I make this multiple rooms?
First created git repo (git init) for my code and .gitignore for all the json crap

https://socket.io/docs/rooms-and-namespaces/
There are 2 mechanims that have potential - namespaces and rooms
The default namespace is '/'
namespaces get their own connection/disconnection events
multiple rooms reside in a namespace
You join/leave rooms within the connection
default room - each socket has random uniq ID, by default this ID is the room

Let's just see if we can change code to use a non-default room
So it took much longer than expected, mainly due to confusion
You can be in more than one room at a time.
And unless you direct the messages to a specific room, they go everywhere!

Commited code,  got a 3 room with dropdown selection working.
Will be in one room at a time.
Lets try committing from VSCode!