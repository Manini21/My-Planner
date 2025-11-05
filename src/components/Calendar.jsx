// src/components/Calendar.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function MyCalendar({ onChange, value }) {
  return (
    <div className="box calendar-box">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}


/*
function MyCalendar({ onDateChange }) {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className="box calendar-box">
      <h2>📅 Calendar</h2>
      <Calendar onChange={setDate} value={date} />
      <p>Selected Date: {date.toDateString()}</p>
    </div>
  );
};
*/

export default MyCalendar;
