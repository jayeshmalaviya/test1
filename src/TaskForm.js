import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("TODO");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !dueDate) {
      // Basic form validation - checking for required fields
      alert("Please fill in the required fields.");
      return;
    }
    // Create a new task object
    const newTask = {
      name,
      description,
      dueDate,
      status,
    };
    console.log(newTask);

    fetch("http://localhost:8080/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        response.json();
      })
      .then((messageRecived) => {
        console.log(messageRecived);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Call the addTask function passed as props from the parent component
    addTask(newTask);

    // Reset the form inputs
    setName("");
    setDescription("");
    setDueDate("");
    setStatus("TODO");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="TODO">TODO</option>
          <option value="ONGOING">ONGOING</option>
          <option value="ONHOLD">ONHOLD</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
