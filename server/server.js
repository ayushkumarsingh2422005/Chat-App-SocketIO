import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
    res.send('Hello, World!'); 
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.send()
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});