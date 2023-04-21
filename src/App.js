import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import {Home} from "./components/Home";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
