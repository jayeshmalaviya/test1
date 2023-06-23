import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    // Generate a unique ID for the new task
    newTask.id = Date.now();

    // Add the new task to the tasks array
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    // Find the index of the task in the tasks array based on the taskId
    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    // Create a copy of the tasks array
    const updatedTasks = [...tasks];

    // Update the task at the specified index
    updatedTasks[taskIndex] = updatedTask;

    // Update the tasks array with the updatedTasks
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
