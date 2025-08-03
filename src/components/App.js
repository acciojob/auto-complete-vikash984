import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

const App = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let timeoutId;

    if (input.trim() === "") {
      setSuggestions([]);
    } else {
      timeoutId = setTimeout(() => {
        const filtered = fruits.filter((fruit) =>
          fruit.toLowerCase().startsWith(input.toLowerCase())
        );
        setSuggestions(filtered);
      }, 300); // 300ms async delay
    }

    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <div>
      {/* Do not remove the main div */}
      <input
        type="text"
        placeholder="Search fruits..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ul>
        {suggestions.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
