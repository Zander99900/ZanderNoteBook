import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get All Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTg0ZGJhOTUxZWU3ZjFlNTZiN2M3In0sImlhdCI6MTY4MTU3MjE5OX0.UvXk-t2o6mtpTQy7wvJSHf02Liye1YwNYNnahxi5Pa4",
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTg0ZGJhOTUxZWU3ZjFlNTZiN2M3In0sImlhdCI6MTY4MTU3MjE5OX0.UvXk-t2o6mtpTQy7wvJSHf02Liye1YwNYNnahxi5Pa4",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    const note = {
      _id: "643e383069607798c686cffc3c",
      user: "643984dba951ee7f1e56b7c7",
      title: title,
      description: description,
      tag: tag,
      timestamp: "2023-04-18T06:26:56.155Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTg0ZGJhOTUxZWU3ZjFlNTZiN2M3In0sImlhdCI6MTY4MTU3MjE5OX0.UvXk-t2o6mtpTQy7wvJSHf02Liye1YwNYNnahxi5Pa4",
      }
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTg0ZGJhOTUxZWU3ZjFlNTZiN2M3In0sImlhdCI6MTY4MTU3MjE5OX0.UvXk-t2o6mtpTQy7wvJSHf02Liye1YwNYNnahxi5Pa4",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    //Logic to edit note
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
