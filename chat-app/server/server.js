const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {
  generateLocationMessage,
  generateMessage
} = require("./util/message")

var app = express();
var server = http.createServer(app);
var io = socketIo(server); // io is a Server object

const publicPath = path.join(__dirname, "../public")
const port = process.env.npm_package_config_port || 8888;
// use static resource
app.use(express.static(publicPath))

app.get('/', function(req, res) {
  res.sendFile(publicPath + '/index.html');
});

// if a socket connects to the server
io.on("connection", (socket) => {
  console.log(`New user connected`);

  // here server send an event to client, passes some parameters like from, text
  // socket.emit("newEmail", {
  //   from: 'mike@example.com',
  //   text: "Hey say hello"
  // })

  // server listens for createEmail event. receives email from client
  socket.on("createEmail", (email) => {
    console.log(email);
  })

  // socket.emit("newMessage", {
  //   to: "ya",
  //   message: "hahahahaha"
  // })

  socket.on("createMessage", (message, callback) => {
    console.log(message);
    // send a new message to all sockets(client) include the sender
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })

    // everyone gets it but the sender
    //socket.broadcast.emit("newMessage", generateMessage(message.from, message.text));
    // client callback method. Here we can control how does client behave
    callback(true, 'This is from the server');
  })


  // we want to send a welcome message to user if the user logged in
  // and send join message to other connected users
  socket.emit("newMessage", generateMessage("admin", "Welcome to chat app"))
  socket.broadcast.emit("newMessage", generateMessage("admin", "New user joined"))


  socket.on("disconnect", (reason) => {
    console.log(`User was disconnected. Reason: ${reason}`);
  })


  socket.on("createLocationMessage", (coords) => {
    io.emit("newLocationMessage", generateLocationMessage("admin", `${coords.latitude}`, `${coords.longitude}`))
  })

});



server.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
