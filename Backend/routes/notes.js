const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/Fetchuser");
const Note = require("../models/Note");
//Route 1: Get all notes using GET "/api/notes/fetchuser"
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //To send unexpected errors
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route 2: Add notes using POST "/api/notes/addnote"
router.post(
  "/addnote",
  [
    body("title", "The title must contain atleast 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "The description must contain atleast 5 characters"
    ).isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      //To send unexpected errors
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: update notes using PUT "/api/notes/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Creating a newNote Object to store the new data
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Updating the existing data with the data from newNote
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
  } catch (error) {
    //To send unexpected errors
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 4: Delete notes using DELETE "/api/notes/DELETEnote"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted & delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //To check whether user deletes only his own note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note deleted"});
  } catch (error) {
    //To send unexpected errors
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
