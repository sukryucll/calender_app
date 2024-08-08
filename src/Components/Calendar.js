import React, { useEffect, useState } from "react";
import "./Calendar.css";
import {
  getStoredDate,
  getStoredMonth,
  setStoredDate,
  setStoredMonth,
  getStoredTodos,
  setStoredTodos,
} from "./storage";
import TransactionForm from "./add-transaction";
import { useDisclosure } from "@chakra-ui/react";
import Todos from "./todos";
import { AddIcon } from "@chakra-ui/icons"; // Artı işareti için

function Calendar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [todosByDate, setTodosByDate] = useState({}); // Tarih bazında todo'ları saklamak için

  useEffect(() => {
    const storedDate = getStoredDate();
    const storedMonth = getStoredMonth();
    const storedTodos = getStoredTodos();

    if (!storedDate) {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(storedDate);
    }

    setCurrentDate(storedMonth);
    setTodosByDate(storedTodos);
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

  useEffect(() => {
    setStoredTodos(todosByDate);
  }, [todosByDate]);

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

  const handleSquareClick = (e, date) => {
    e.stopPropagation(); // Kareye tıklama olayının tarihe yayılmasını engeller
    setSelectedDate(date);
    onOpen(); // Formu açar
  };

  const handleAddTransaction = (description) => {
    setTodosByDate((prev) => ({
      ...prev,
      [selectedDate.toDateString()]: [...(prev[selectedDate.toDateString()] || []), description],
    }));
  };

  const handleRemoveTransaction = (index) => {
    const updatedTodos = todosByDate[selectedDate.toDateString()].filter((_, i) => i !== index);
    setTodosByDate((prev) => ({
      ...prev,
      [selectedDate.toDateString()]: updatedTodos,
    }));
  };

  return (
    <div className="container">
      <div className="calendar">
        <div className="header">
          <button onClick={prevMonth}>&lt;</button>
          <span>
            {currentDate.toLocaleString("en-US", { month: "long" })}{" "}
            {currentDate.getFullYear()}
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
  className={`day ${selectedDate && day.toDateString() === selectedDate.toDateString() ? "selected" : ""}`}
  onClick={() => handleDateClick(day)}
>
  <span>{day.getDate()}</span>
  <div className="square-container">
    <div
      className="square"
      onClick={(e) => handleSquareClick(e, day)}
    >
      <AddIcon />
    </div>
    {todosByDate[day.toDateString()] && todosByDate[day.toDateString()].length > 0 && (
      <div className="square-count">
        {todosByDate[day.toDateString()].length}
      </div>
    )}
  </div>
</div>

          ))}
        </div>
        <TransactionForm
          onClose={onClose}
          isOpen={isOpen}
          onAddTransaction={handleAddTransaction}
        />
      </div>
      <Todos
  transactions={todosByDate[selectedDate?.toDateString()] || []}
  onRemoveTransaction={handleRemoveTransaction}
  selectedDate={selectedDate}
/>
    </div>
  );
}

export default Calendar;
