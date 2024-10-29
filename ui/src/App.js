import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your API Gateway URL

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("message");
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      const message = { text: input, sender: "You" }; // Customize this as needed
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput("");
      await axios.post("http://localhost:5000/api/messages", message); // Replace with your API endpoint
    }
  };

  return (
    <div className="app">
      <h1>Chatter</h1>
      <div className="content">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{msg.sender}</strong>: {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
