// client/src/socket.js

import { io } from "socket.io-client";

const socket = io("https://chat-app-backend-sea3.onrender.com"); // Replace with your server URL

export default socket;
