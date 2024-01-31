import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Aayein");
});

io.on("connection", (socket) => {
  console.log("User Conencted");
});

app.listen(PORT, () => {
  {
    console.log(`Server is running on Port ${PORT}`);
  }
});
