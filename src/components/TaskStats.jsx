import {
  countCompleted,
  countPending,
} from "../utils/taskHelpers";

function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = countCompleted(tasks);
  const pending = countPending(tasks);

  return (
    <div className="task-stats">
      <span>🟢 Pending: {pending}</span>
      <span style={{ marginLeft: "15px" }}>
        🔵 Completed: {completed}
      </span>
      <span style={{ marginLeft: "15px" }}>
        📊 Total: {total}
      </span>
    </div>
  );
}

export default TaskStats;