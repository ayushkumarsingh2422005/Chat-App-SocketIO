import React, { useEffect, useRef, useState } from 'react';
import socket from '../config/socket';
import { LuSendHorizonal } from "react-icons/lu";
import '../App.css';
import { useLocation } from 'react-router-dom';

export default function Messages() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const msgRef = useRef();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get('name') || 'Anonymous'; // Default to 'Anonymous' if no name is provided

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (data) => {
      console.log(data);
      setMessages(prevMessages => [...prevMessages, { type: 'received', user: data.user, text: data.text }]);
      
      if (Notification.permission === 'granted') {
        new Notification(`${data.user}`, {
          body: data.text,
          icon: '/path-to-your-icon.png' // Optional: include an icon if you have one
        });
      }
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (prompt.trim() !== "") {
      const messageData = { user: userName, text: prompt };
      socket.emit("msg", messageData);
      setMessages(prevMessages => [...prevMessages, { type: 'send', user: userName, text: prompt }]);
      setPrompt("");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 p-5">
      <div className="max-w-md w-full p-5 bg-white rounded-lg shadow-lg flex flex-col gap-5 max-h-full">
        <div className="h-[80%] flex flex-col gap-3 overflow-y-auto" ref={msgRef}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'send' ? 'send' : 'received'}>
              <strong className='font-semibold italic text-xs'>{msg.user}</strong><br />{msg.text}
            </div>
          ))}
        </div>
        <div className="h-[20%] border-t border-gray-300 flex items-center justify-between gap-2 p-2">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            value={prompt}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300 ease-in-out"
            onClick={sendMessage}
          >
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
}
