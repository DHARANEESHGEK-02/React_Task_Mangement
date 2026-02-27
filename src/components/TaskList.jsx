import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask, editTask }) {
  return (
    <div className="task-list">
      <AnimatePresence mode="popLayout">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 80, transition: { duration: 0.25 } }}
              transition={{ duration: 0.25 }}
            >
              <TaskItem
                task={task}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                editTask={editTask}
              />
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-message"
          >
            🎉 No tasks found!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;