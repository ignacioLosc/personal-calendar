import { useState } from "react";
import "./App.css";
import Column from "./components/Column";
function App() {
  return (
    <div className="App">
      <h1 className="agenda-title">PERSONAL CALENDAR</h1>
      <Column />
    </div>
  );
}

export default App;
