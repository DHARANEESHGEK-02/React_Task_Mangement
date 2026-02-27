export const generateId = () =>
  Date.now().toString() + Math.random().toString(36).substring(2);

export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case "completed":
      return tasks.filter((t) => t.completed);
    case "pending":
      return tasks.filter((t) => !t.completed);
    default:
      return tasks;
  }
};

export const countCompleted = (tasks) =>
  tasks.filter((t) => t.completed).length;

export const countPending = (tasks) =>
  tasks.filter((t) => !t.completed).length;