import React, { useState, useEffect } from "react";
import "./App.css";
import bgImage from "./assets/background.jpeg";
import MyCalendar from "./components/Calendar";
import TodoList from "./components/TodoList";
import Stickers from "./components/StickerPack";
import Mascot from "./components/Mascot";
import StickyNotes from "./components/StickyNotes";
import LandingPage from "./components/LandingPage";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notesData, setNotesData] = useState({});
  const [todoData, setTodoData] = useState({});
  const [stickerData, setStickerData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // 🧠 Load data from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notesData")) || {};
    const savedTodos = JSON.parse(localStorage.getItem("todoData")) || {};
    const savedStickers = JSON.parse(localStorage.getItem("stickerData")) || {};
    const savedLogin = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    const savedUser = JSON.parse(localStorage.getItem("userData")) || null;

    setNotesData(savedNotes);
    setTodoData(savedTodos);
    setStickerData(savedStickers);
    setIsLoggedIn(savedLogin);
    setUserData(savedUser);
  }, []);

  // 💾 Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notesData));
  }, [notesData]);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);

  useEffect(() => {
    localStorage.setItem("stickerData", JSON.stringify(stickerData));
  }, [stickerData]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // 📅 Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // 📝 Notes
  const handleNoteChange = (value) => {
    const dateKey = selectedDate.toDateString();
    setNotesData((prev) => ({
      ...prev,
      [dateKey]: { note: value },
    }));
  };

  // ✅ Todos
  const handleTodoChange = (tasks) => {
    const dateKey = selectedDate.toDateString();
    setTodoData((prev) => ({
      ...prev,
      [dateKey]: { tasks },
    }));
  };

  // 🌸 Stickers
  const handleStickersSave = (stickers) => {
    const dateKey = selectedDate.toDateString();
    setStickerData((prev) => ({
      ...prev,
      [dateKey]: { stickers },
    }));
  };

  const dataForDate = {
    note: notesData[selectedDate.toDateString()]?.note || "",
    todos: todoData[selectedDate.toDateString()]?.tasks || [],
    stickers: stickerData[selectedDate.toDateString()]?.stickers || [],
  };

  // 🚪 Show landing page if not logged in
 if (!isLoggedIn) {
    console.log("🟡 Rendering LandingPage, passing onSignup prop");
    return <LandingPage onSignup={() => {
      console.log("🟢 onSignup triggered in App");
      setIsLoggedIn(true);
    }} />;
  }
  return (
    <div className="app" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* 🚪 Logout button */}
      <button
        className="logout-btn"
        onClick={() => {
          setIsLoggedIn(false);
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
        }}
      >
        Logout
      </button>

      <div className="planner-container">
        <div className="left-section">
          <MyCalendar onChange={handleDateChange} value={selectedDate} />
          <Stickers />
        </div>

        <div className="center-section">
          <StickyNotes
            notes={dataForDate.note}
            stickers={dataForDate.stickers}
            onSave={(value) => handleNoteChange(value)}
            onStickersSave={(stickers) => handleStickersSave(stickers)}
          />
        </div>

        <div className="right-section">
          <TodoList
            todos={dataForDate.todos}
            onSave={(tasks) => handleTodoChange(tasks)}
          />
          <Mascot />

          
        </div>
      </div>
    </div>
  );
}

export default App;
