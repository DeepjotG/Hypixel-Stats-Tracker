import React from "react";
import "./style.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
