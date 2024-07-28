import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import { config as configDotenv } from 'dotenv';
import authRoutes from './Routes/auth.js';
configDotenv();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://chat-app-cb5j.onrender.com",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("msg", (message) => {
    socket.broadcast.emit("message", message);
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});
