import { useState, useEffect } from "react";

function Notes() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  // Load saved notes when the component first mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar-notes");
    if (savedNotes) setText(savedNotes);
  }, []);

  const handleSave = () => {
    localStorage.setItem("calendar-notes", text);
    setSaved(true);
    // Hide the "Saved!" message after 2 seconds
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setText("");
    localStorage.removeItem("calendar-notes");
  };

  return (
    <div className="notes-container">
      <h3>My Notes</h3>
      <textarea
        className="notes-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your notes here.."
        rows={12}
      />
      <div className="notes-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="clear-btn" onClick={handleClear}>Clear</button>
      </div>
      {saved && <p className="saved-msg">Notes saved!</p>}
    </div>
  );
}

export default Notes;
