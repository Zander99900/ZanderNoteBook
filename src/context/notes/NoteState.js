import { useState } from "react";
import noteContext from "./noteContext"

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "643e3772420881836f50e106",
          "user": "643984dba951ee7f1e56b7c7",
          "title": "My Updated title",
          "description": "This is my updated version of 2nd note",
          "tag": "3rd React-Work",
          "timestamp": "2023-04-18T06:23:46.103Z",
          "__v": 0
        },
        {
          "_id": "643e383069607798c686cc3c",
          "user": "643984dba951ee7f1e56b7c7",
          "title": "My 2nd title",
          "description": "This is my 2nd note",
          "tag": "2nd React-Work",
          "timestamp": "2023-04-18T06:26:56.155Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

      //Add a note
      const addNote = (title, description, tag) =>{
        const note = {
          "_id": "643e383069607798c686cffc3c",
          "user": "643984dba951ee7f1e56b7c7",
          "title": title,
          "description": description,
          "tag": tag,
          "timestamp": "2023-04-18T06:26:56.155Z",
          "__v": 0
        }
        
        setNotes(notes.concat(note))
      }
      //Delete a note
      const deleteNote = () =>{
        
      }
      //Edit a note
      const editNote = () =>{
        
      }
    return(
        <noteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState