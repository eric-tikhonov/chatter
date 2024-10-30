import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your API Gateway URL

const Chat = ({ name }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => socket.off("message");
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      const message = { text: input, sender: "You" };
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput("");
      await axios.post("http://localhost:5000/api/messages", message); // Replace with your API endpoint
    }
  };

  return (
    <div className="content">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            ref={inputRef}
          />
        </div>
        <div className="send-button">
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
