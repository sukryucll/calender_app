import React, { useEffect, useState } from "react";
import "./Calendar.css";
import { getStoredDate, getStoredMonth, setStoredDate, setStoredMonth } from './storage';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedDate = getStoredDate();
    const storedMonth = getStoredMonth();

    if (!storedDate) {
      // If there's no stored date, set today's date as the selected date
      setSelectedDate(new Date());
    } else {
      setSelectedDate(storedDate);
    }

    setCurrentDate(storedMonth);
  }, []);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  useEffect(() => {
    setStoredDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setStoredMonth(currentDate);
  }, [currentDate]);

  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <span>
          {currentDate.toLocaleString("en-US", { month: "long" })} {currentDate.getFullYear()}
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="day-names">
        {dayNames.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={index} className="empty-day"></div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day.toDateString()}
            className={`day ${
              selectedDate && day.toDateString() === selectedDate.toDateString()
                ? "selected"
                : ""
            }`}
            onClick={() => handleDateClick(day)}
          >{day.getDate()}</div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
