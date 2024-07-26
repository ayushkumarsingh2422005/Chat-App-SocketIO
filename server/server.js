import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://chat-app-cb5j.onrender.com/", // Updated to match the frontend URL without trailing slash
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("msg", (message) => {
    socket.broadcast.emit("message", message); // Broadcast the message to all clients
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});
