import React, { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList({ todos = [], onSave }) {
  const [tasks, setTasks] = useState(todos);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTasks, setPopupTasks] = useState([{ text: "", completed: false }]);

  // Update list when date changes
  useEffect(() => {
    setTasks(todos);
  }, [todos]);

  const handleCheckboxChange = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
    onSave(updated);
  };

  // Popup interactions
  const handleAddClick = () => {
    setShowPopup(true);
    setPopupTasks([{ text: "", completed: false }]); // fresh popup
  };

  const handlePopupTextChange = (index, value) => {
    const updated = [...popupTasks];
    updated[index].text = value;
    setPopupTasks(updated);
  };

  const handleAddNewField = () => {
    setPopupTasks([...popupTasks, { text: "", completed: false }]);
  };

  const handleSavePopup = () => {
    const validTasks = popupTasks.filter((t) => t.text.trim() !== "");
    const updated = [...tasks, ...validTasks];
    setTasks(updated);
    onSave(updated);
    setShowPopup(false);
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet for this date.</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(index)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="add-task">
        <button className="add-btn" onClick={handleAddClick}>
          +
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="todo-popup">
          <div className="todo-popup-content">
            <h3>Add Tasks</h3>
            <div className="popup-tasks">
              {popupTasks.map((task, index) => (
                <div key={index} className="popup-task-item">
                  <input type="checkbox" disabled />
                  <input
                    type="text"
                    placeholder={`Task ${index + 1}`}
                    value={task.text}
                    onChange={(e) =>
                      handlePopupTextChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
              <button className="add-field-btn" onClick={handleAddNewField}>
                +
              </button>
            </div>

            <div className="popup-buttons">
              <button onClick={handleSavePopup}>Save</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
