import { useState } from "react";
import Calendar from "./components/Calendar";
import Notes from "./components/Notes";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app-wrapper ${darkMode ? "dark" : ""}`}>
      <header className="app-header">
        <h1>PlanIt Calendar</h1>
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode":"Dark Mode"}
        </button>
      </header>

      <main className="app-main">
        <Calendar />
        <Notes />
      </main>
    </div>
  );
}

export default App;
<footer style={{ textAlign: "center", padding: "10px", fontSize: "0.8rem" }}>
  Built for frontend task
</footer>