import React, { useState } from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState("Anonymous");
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-md w-full p-5 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Enter Your Name</h2>
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter your name"
            value={user}
          />
          <button
            onClick={() => {
              console.log(`Continuing as ${user}`);
              // Additional actions here
              localStorage.setItem('user', user);
              navigate("/messages", { replace: true });
            }}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out"
          >
            Continue as {user}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
