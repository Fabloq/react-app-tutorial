import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const projectName = "pginttest";
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [noteID, setNoteID] = useState("");

  const [step, setStep] = useState(0);

  const [notes, setNotes] = useState([]);

  const handleCreateNote = () => {
    axios
      .post(`https://api.fabloq.com/${projectName}/notes/create/`, {
        name: name,
        body: body,
      })
      .then((res) => {
        setNoteID("");
        setName("");
        setBody("");
        setStep(0);
      });
  };

  const handleEditNote = () => {
    axios
      .put(`https://api.fabloq.com/${projectName}/notes/edit/`, {
        id: noteID,
        body: body,
        name: name,
      })
      .then((res) => {
        setNoteID("");
        setName("");
        setBody("");
        setStep(0);
        console.log(res.data);
      });
  };

  const handleDeleteNote = (id) => {
    axios
      .delete(`https://api.fabloq.com/${projectName}/notes/delete/`, {
        data: {
          id: id,
        },
      })
      .then((res) => {
        getNotes();
      });
  };

  const getNotes = () => {
    setNotes([]);
    axios
      .get(`https://api.fabloq.com/${projectName}/notes/list/`)
      .then((res) => {
        setNotes(res.data.notes);
      });
  };

  useEffect(() => {
    if (step === 0) {
      getNotes();
    }
  }, [step]);

  switch (step) {
    case 0:
      return (
        <div className="App">
          <h1>My Notes</h1>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
            {notes.map((obj, index) => {
              return (
                <tr key={obj.id}>
                  <td>{obj.id}</td>
                  <td>{obj.name}</td>
                  <td>
                    <a
                      href="#"
                      onClick={() => {
                        setStep(2);
                        setName(obj.name);
                        setBody(obj.body);
                        setNoteID(obj.id);
                      }}
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        handleDeleteNote(obj.id);
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </table>
          <button
            onClick={() => {
              setStep(1);
              setName("");
              setBody("");
              setNoteID("");
            }}
          >
            Add new note
          </button>
        </div>
      );

    case 1:
      return (
        <div className="App">
          <h1>
            <button onClick={() => setStep(0)}>Home</button>Create Note
          </h1>
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
    case 2:
      return (
        <div className="App">
          <h1>
            <button onClick={() => setStep(0)}>Home</button>Edit Note
          </h1>
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
          <button onClick={() => handleEditNote()}>Save</button>
        </div>
      );
  }
}

export default App;
