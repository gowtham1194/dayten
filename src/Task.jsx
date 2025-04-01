import React from "react";
import axios from "axios";

const Task = ({ task, fetchTasks }) => {


  // Function to delete the task
  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${task._id}`);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

// complete task
  const toggleComplete = async () => {
    try {
      await axios.put(`http://localhost:3000/api/tasks/${task._id}`, {
        completed: !task.completed, // Toggle the `completed` status
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  <button onClick={toggleComplete}>
  {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
</button>

  // Format the due date for display
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date";

  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description || "No description available"}</p>
      <p>Due: {formattedDate}</p>
      <p>Status: {task.status || "No status available"}</p>
      <button onClick={toggleComplete}>
        {task.status === "Completed" ? "Reopen" : "Complete"}
      </button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default Task;
