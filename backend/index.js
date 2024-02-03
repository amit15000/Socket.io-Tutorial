import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 5000;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.get("/", (req, res) => {
  res.send("Aayein");
});

io.on("connection", (socket) => {
  console.log("You are now Conencted {From backend}");
  socket.emit(
    "welcome",
    `This is your socket Id  ${socket.id} {msg sent from bEnd to fEnd}`
  );
  socket.broadcast.emit(
    "msgToAll",
    `${socket.id} joined the circuit {msg from bEnd}`
  );
  io.emit("messageToRoom", (data) => {
    console.log(data);
  });
});

server.listen(PORT, () => {
  {
    console.log(`Server is running on Port ${PORT}`);
  }
});
