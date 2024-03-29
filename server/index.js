const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);

  socket.on("chat message", ({ nickname, msg }) => {
    const name = nickname ? nickname : id;
    console.log(`${name}: ${msg}`);
    io.emit("chat message", { nickname: name, msg });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on *: ${PORT}`);
});
