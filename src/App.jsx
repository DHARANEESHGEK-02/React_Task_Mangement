import { useState, useMemo, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import TaskStats from "./components/TaskStats";
import ProgressCircle from "./components/ProgressCircle";
import useLocalStorage from "./hooks/useLocalStorage";
import { filterTasks, generateId } from "./utils/taskHelpers";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("pending");
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Dark Mode
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // 🔔 Notification Reminder
  useEffect(() => {
    if (!("Notification" in window)) return;

    Notification.requestPermission();

    const now = new Date();

    tasks.forEach((task) => {
      if (task.dueDate && !task.completed) {
        const due = new Date(task.dueDate);

        if (due <= now) {
          new Notification("⏰ Task Due!", {
            body: task.title,
          });
        }
      }
    });
  }, [tasks]);

  // ➕ Add Task
  const addTask = (title, dueDate, priority) => {
    if (!title.trim()) return;

    const newTask = {
      id: generateId(),
      title: title.trim(),
      completed: false,
      dueDate,
      priority,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filter);
  }, [tasks, filter]);

  return (
    <div className="app-container">
      <button
        className="dark-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <h1>🚀 Advanced Task Manager</h1>

      <ProgressCircle tasks={tasks} />

      <TaskForm addTask={addTask} />

      <FilterButtons
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
        tasks={tasks}
      />

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
      />

      <TaskStats tasks={tasks} />
    </div>
  );
}

export default App;