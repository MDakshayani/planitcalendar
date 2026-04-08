import { useState } from "react";
import Day from "./Day";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Calendar() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // moving to previous month
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // moving to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // handling user date clicks (start and end selection)
  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    if (!startDate || endDate) {
      // start fresh
      setStartDate(clickedDate);
      setEndDate(null);
    } else {
      // swap if user picked an earlier end date
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  // check what style a day should get
  const getDayStatus = (day) => {
    const date = new Date(currentYear, currentMonth, day);

    const isStart = startDate && date.toDateString() === startDate.toDateString();
    const isEnd = endDate && date.toDateString() === endDate.toDateString();
    const isInRange =
      startDate && endDate && date > startDate && date < endDate;
    const isToday = date.toDateString() === today.toDateString();

    if (isStart || isEnd) return "selected";
    if (isInRange) return "in-range";
    if (isToday) return "today";
    return "";
  };

  // creating calendar cells
  const getCalendarCells = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells = [];

    // blank spots before day 1
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="day-cell empty" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const status = getDayStatus(day);
      cells.push(
        <Day
          key={day}
          day={day}
          status={status}
          onClick={() => handleDayClick(day)}
        />
      );
    }

    return cells;
  };

  return (
    <div className="calendar-container">
      {/* Hero image at the top */}
      <div className="calendar-hero">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
          alt="Coding workspace"
          className="hero-image"
        />
      </div>

      {/* Month navigation */}
      <div className="calendar-nav">
        <button className="nav-btn" onClick={goToPrevMonth}>&#8249;</button>
        <h2 className="month-title">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h2>
        <button className="nav-btn" onClick={goToNextMonth}>&#8250;</button>
      </div>

      {/* Day of week headers */}
      <div className="calendar-grid">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="day-header">{day}</div>
        ))}

        {getCalendarCells()}
      </div>

      {/* Always show range bar — shows "—" when nothing is selected */}
      <div className="range-info">
        <span className="range-label">Selected:</span>
        {startDate && endDate ? (
          <span className="range-value">
            {startDate.getDate()} → {endDate.getDate()}
          </span>
        ) : startDate ? (
          <span className="range-value muted">
            {startDate.getDate()} → pick an end date
          </span>
        ) : (
          <span className="range-value muted">—</span>
        )}
      </div>
    </div>
  );
}

export default Calendar;
