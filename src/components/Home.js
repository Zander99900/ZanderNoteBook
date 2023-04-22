import React, {useContext} from "react";
import contextValue from "../context/notes/NoteContext";
export const Home = () => {
  // fetching notes from contextAPI
  const context = useContext(contextValue);
  const {notes, setNotes} = context;
  return (
    <div>
      <div className="container">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="container">
        <h2>Your Note</h2>
        {/* Displaying notes fetched from above line 5 & 6*/}
        {notes.map((note)=>{
          return note.title;
        })}
        
      </div>
    </div>
  );
};
