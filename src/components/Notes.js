import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

const Notes = () => {
  // fetching notes from contextAPI
  const context = useContext(noteContext);
  const { notes, addNote } = context;
  return (
    <>
      <Addnote/>
      <div className="row my-3">
        <h2>Your Note</h2>
        {/* Displaying notes fetched from above line 4 & 5 */}
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
