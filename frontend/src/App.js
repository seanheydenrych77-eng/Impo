import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrepsWorkspace from "./components/PrepsWorkspace";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrepsWorkspace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;