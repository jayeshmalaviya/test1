import React, { useEffect, useState } from "react";
import TaskUpdateForm from "./TaskUpdateForm";

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [data, setData] = useState([]);
  // Define state variables for the updated task fields
  const [name, setName] = useState(tasks.name);
  const [description, setDescription] = useState(tasks.description);
  const [dueDate, setDueDate] = useState(tasks.dueDate);
  const [status, setStatus] = useState(tasks.status);

  const datatochange = {
    name,
    description,
    dueDate,
    status,
  };
  const handleUpdate = (taskId) => {
    // Find the task in the tasks array based on the taskId
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    // Set the selectedTask state to open the update form and pass the task object
    setSelectedTask(taskToUpdate);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/tasks/get`)
      .then((e) => e.json())
      .then((data_get) => setData(data_get));
  }, [data]);

  const handleFormClose = () => {
    // Clear the selectedTask state to close the update form
    setSelectedTask(null);
  };

  return (
    <ul>
      {data.map((task) => (
        <li key={task.id}>
          <strong>Name:</strong> {task.name}
          <br />
          <strong>Description:</strong> {task.description}
          <br />
          <strong>Due Date:</strong> {task.dueDate}
          <br />
          <strong>Status:</strong> {task.status}
          <br />
          <button onClick={() => setSelectedTask(true)}>Update</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
      {selectedTask && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Update Task</h2>
            <TaskUpdateForm
              task={selectedTask}
              onClose={handleFormClose}
              onUpdate={datatochange}
            />
          </div>
        </div>
      )}
    </ul>
  );
};

export default TaskList;

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Create an updated task object
//     const updatedTask = {
//       name,
//       description,
//       dueDate,
//       status,
//     };
//     // Call the onUpdate function to update the task
//     onUpdate(updatedTask);
//     // Close the popup
//     onClose();
//   };
