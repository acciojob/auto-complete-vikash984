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
      }, 300);
    });
  };

  useEffect(() => {
    let cancelled = false;

    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    fetchSuggestions(input).then((results) => {
      if (!cancelled) {
        setSuggestions(results);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
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
      {loading && <p>Loading...</p>}
      <ul>
        {suggestions.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
