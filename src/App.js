import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import {Alerts} from "./components/Alerts";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alerts message = "This is a sample Alert"/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
