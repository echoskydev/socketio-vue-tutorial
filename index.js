const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  // res.send('Hello World!')
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("chat.message", (message) => {
    console.log("Socket Receive : ", message);
    io.emit("chat.message", message);
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
