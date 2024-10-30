import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NameEntry from "./components/NameEntry";
import Chat from "./components/Chat";

const App = () => {
  const [name, setName] = useState("");

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<NameEntry setName={setName} />} />
          <Route path="/chat" element={<Chat name={name} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
