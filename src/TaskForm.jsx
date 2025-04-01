import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Open",
  });

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/tasks", taskData);
      fetchTasks();
      setTaskData({ title: "", description: "", dueDate: "", status: "Open" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={createTask}>
      <input
        type="text"
        placeholder="Title"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={taskData.description}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
      />
      <input
        type="date"
        value={taskData.dueDate}
        onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;