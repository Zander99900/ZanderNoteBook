import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "643e3772420881836f50e106",
      user: "643984dba951ee7f1e56b7c7",
      title: "My Updated title",
      description: "This is my updated version of 2nd note",
      tag: "3rd React-Work",
      timestamp: "2023-04-18T06:23:46.103Z",
      __v: 0,
    },
    {
      _id: "643e383069607798c686cc3c",
      user: "643984dba951ee7f1e56b7c7",
      title: "My 2nd title",
      description: "This is my 2nd note",
      tag: "2nd React-Work",
      timestamp: "2023-04-18T06:26:56.155Z",
      __v: 0,
    },
  ];
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
    const json = response.json(); // parses JSON response into native JavaScript objects
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
  const deleteNote = (id) => {
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
    const json = response.json(); // parses JSON response into native JavaScript objects
    //Logic to edit note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
