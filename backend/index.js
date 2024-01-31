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
  console.log("User Conencted");
  console.log("Id :", socket.id);
});

server.listen(PORT, () => {
  {
    console.log(`Server is running on Port ${PORT}`);
  }
});
