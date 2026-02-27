import { useState } from "react";
import { motion } from "framer-motion";

function TaskItem({ task, deleteTask, toggleTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (!newTitle.trim()) return;
    editTask(task.id, newTitle);
    setIsEditing(false);
  };

  const priorityClass = `priority-${task.priority}`;

  return (
    <motion.div
      className={`task-item ${task.completed ? "completed" : ""} ${priorityClass}`}
      whileHover={{ scale: 1.02 }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <div>
        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <>
            <span>{task.title}</span>
            {task.dueDate && (
              <div className="task-due-date">
                📅 {task.dueDate}
              </div>
            )}
          </>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <button className="edit-btn" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default TaskItem;