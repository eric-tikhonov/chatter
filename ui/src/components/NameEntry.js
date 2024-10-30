import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NameEntry = ({ setName }) => {
  const [name, setNameState] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(name);
    navigate("/chat");
  };

  return (
    <div className="name-entry">
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setNameState(e.target.value)}
          required
        />
        <button type="submit">Enter Chat</button>
      </form>
    </div>
  );
};

export default NameEntry;
