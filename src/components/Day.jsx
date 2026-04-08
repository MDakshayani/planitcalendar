// Each individual day cell in the calendar grid
function Day({ day, status, onClick }) {
  return (
    <div
      className={`day-cell ${status}`}
      onClick={onClick}
    >
      {day}
    </div>
  );
}

export default Day;
