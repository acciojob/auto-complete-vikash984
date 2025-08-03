
import React from "react";
import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

const App = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = fruits.filter((fruit) =>
          fruit.toLowerCase().startsWith(query.toLowerCase())
        );
        resolve(result);
      }, 300); // 300ms delay to simulate async
    });
  };

  useEffect(() => {
    let isCancelled = false;

    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    fetchSuggestions(input).then((result) => {
      if (!isCancelled) {
        setSuggestions(result);
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [input]);

  return (
    <div>
      {/* Do not remove the main div */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search fruits..."
      />
      {loading && <p>Loading...</p>}
      <ul>
        {suggestions.map((fruit, idx) => (
          <li key={idx}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
