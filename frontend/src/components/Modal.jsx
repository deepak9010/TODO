import React, { useState } from 'react';
import '../styles/modal.css';

const Modal = ({ isOpen, onClose,fetchTasks }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = {
      title: taskTitle,
      description,
      startTime,
      endTime,
      date: Math.floor(new Date(date).getTime() / 1000),
      status,
      priority,
    };

       // Log the task data
      //  console.log('Task Data:', taskData);

    const apiUrl = `${process.env.REACT_APP_API_URL}/create`; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('Task created successfully:', result);

      // Call fetchTasks to refresh the task list
      fetchTasks();

      setTaskTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
      setStartTime('');
      setEndTime('');
      setDate('');
      onClose();

    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Task Title" 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)} 
            required 
          />
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows="2" 
            required 
          />
          <div className="status-priority-container">
            <div className="status-container">
              <label htmlFor="status">Status:</label>
              <select 
                id="status" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="priority-container">
              <label htmlFor="priority">Priority:</label>
              <select 
                id="priority" 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="time-container">
            <div className="start-time-container">
              <label htmlFor="start-time">Start Time:</label>
              <input 
                type="time" 
                id="start-time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)} 
              />
            </div>
            <div className="end-time-container">
              <label htmlFor="end-time">End Time:</label>
              <input 
                type="time" 
                id="end-time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)} 
              />
            </div>
          </div>
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
          <div className="button-container">
            <button type="submit">Create</button>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
