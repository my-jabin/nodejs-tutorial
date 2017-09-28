// load the socket.io-client, which exposes a io global, and then connect.
// a socket connects to server
var socket = io();
// API:https://github.com/socketio/socket.io-client/blob/master/docs/API.md#event-connect
socket.on("connect", function() {
  console.log("connected to server");

  // socket.emit("createEmail", {
  //   to: "Jan@example.com",
  //   text: "Hey Hi"
  // })

  // socket.emit("createMessage", {
  //   from: "Andrew",
  //   message: "This is an message"
  // })
});

socket.on("disconnect", function(reason) {
  console.log(`disconnected from server. Reason: ${reason}`);
  socket.close();
})

// socket listens the event "newEmail" from server. function handles the event
socket.on("newEmail", function(email) {
  console.log(`new Email`, email);
})


socket.on("newMessage", (message) => {
  var li = $("<li class=mdl-list__item></li>");
  var span = $("<span class=mdl-list__item-primary-content></span>");
  var i = $("<i class='material-icons mdl-list__item-icon'>'person'</i>")
  i.class = "material-icons mdl-list__item-icon"
  //Inserts content at the end of the selected elements
  span.append(i);
  span.append(`${message.from}: ${message.text}`)
  li.append(span);
  $("#messages").append(li);
})

socket.emit("createMessage", {
  from: "Frank",
  text: "Hi"
}, function(result, data) {
  // callback function. It called after the server receives message and then send a message back to client.
  console.log(`Did I successful send: ${result}, data: ${data}`);
})

socket.on("newLocationMessage", (locations) => {
  var li = $("<li class=mdl-list__item></li>");
  var span = $("<span class=mdl-list__item-primary-content></span>");
  var i = $("<i class='material-icons mdl-list__item-icon'>'person'</i>")
  var link = $(`<a target='_blank'>My Current Location</a>`)
  link.attr('href', locations.url)
  link.css("margin", "8px")
  span.append(i);
  span.append(`${locations.from}:  `)
  span.append(link)
  li.append(span);
  $("#messages").append(li);
})


$(function() {

  $("#message-form").on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage", {
      from: "User",
      text: $("#message").val()
    }, function(result, data) {
      //console.log(`Did I successful send: ${result}, data: ${data}`);
    })
  })

  $("#locationButton").on("click", function() {
    if (!navigator.geolocation) {
      return alert("geolocation not supported by your browser")
    }
    navigator.geolocation.getCurrentPosition((position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      alert(`position: ${latitude},${longitude} `)

      socket.emit("createLocationMessage", {
        latitude,
        longitude
      })

    }, () => {
      alert(`cannot get location. Error.`)
    })
  })
});
