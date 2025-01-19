import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const handleCreateNote = () => {
    axios
      .post("https://api.fabloq.com/pginttest/notes/create/", {
        name: name,
        body: body,
      })
      .then((res) => {
        setName("");
        setBody("");
      });
  };

  return (
    <div className="App">
      <h1>Create Note</h1>
      <label>Note name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Body</label>
      <textarea
        rows="6"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <button onClick={() => handleCreateNote()}>Save</button>
    </div>
  );
}

export default App;
