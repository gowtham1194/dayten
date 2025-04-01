import React from "react";
import Task from "./Task";


const TaskList = ({ tasks, fetchTasks }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task key={task._id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;