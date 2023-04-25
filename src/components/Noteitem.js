import React from "react";

const Noteitem = (props) => {
  const { note, deleteNote } = props;
  return (
    // {note.title}
    // {note.description}
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fas fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2"></i>
        </div>
        </div>
      </div>
  );
};

export default Noteitem;
