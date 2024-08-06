export const getStoredDate = () => {
  const storedDate = localStorage.getItem("selectedDate");
  return storedDate ? new Date(storedDate) : null;
};

export const getStoredMonth = () => {
  const storedMonth = localStorage.getItem("currentDate");
  return storedMonth ? new Date(storedMonth) : new Date();
};

export const setStoredDate = (date) => {
  if (date) {
    localStorage.setItem("selectedDate", date.toISOString());
  }
};

export const setStoredMonth = (date) => {
  localStorage.setItem("currentDate", date.toISOString());
};
export const getStoredTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const setStoredTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
