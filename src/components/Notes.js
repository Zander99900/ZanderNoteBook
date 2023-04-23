import React, { useContext } from "react";
import contextValue from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";

const Notes = () => {
  // fetching notes from contextAPI
  const context = useContext(contextValue);
  const { notes, setNotes } = context;
  return (
    <div className="container">
      <h2>Your Note</h2>
      {/* Displaying notes fetched from above line 4 & 5 */}
      {notes.map((note) => {
        return <Noteitem key={note._id} note={note} />;
      })}
    </div>
  );
};

export default Notes;
