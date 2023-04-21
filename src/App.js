import "./App.css";
import React from "react";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <About />
        <Home />
        <Routes>
          <Route exact path="/" element={Home} />
          <Route exact path="/about" element={About} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
