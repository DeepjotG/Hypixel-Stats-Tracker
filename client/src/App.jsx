import React from "react";
import "./style.css";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
};

export default App;
