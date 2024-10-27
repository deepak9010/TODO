// src/components/Read.js

import React, { useEffect, useState } from 'react';
import '../styles/read.css';


const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    } else if (modifier === 'AM' && hours === '12') {
        hours = '00';
    }

    return `${hours}:${minutes}`;
};

const Read = ({ isOpen, onClose, taskId }) => {
  const [task, setTask] = useState(null);

  console.log("taskiddddd",taskId);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (taskId) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/task/${taskId}`);
          const data = await response.json();

          if (response.ok) {
            setTask(data.data); 
          } else {
            console.error('Error fetching task details:', data.message);
          }
        } catch (error) {
          console.error('Error fetching task details:', error);
        }
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Task Details</h2>
        {task ? (
          <form>
            <input 
              type="text" 
              placeholder="Task Title" 
              value={task.title} 
              readOnly 
            />
            <textarea 
              placeholder="Description" 
              value={task.description} 
              rows="2" 
              readOnly 
            />
            <div className="status-priority-container">
              <div className="status-container">
                <label htmlFor="status">Status:</label>
                <select 
                  id="status" 
                  value={task.status} 
                  disabled
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="priority-container">
                <label htmlFor="priority">Priority:</label>
                <select 
                  id="priority" 
                  value={task.priority} 
                  disabled
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
                  value={convertTo24HourFormat(task.startTime)} 
                  readOnly 
                />
              </div>
              <div className="end-time-container">
                <label htmlFor="end-time">End Time:</label>
                <input 
                  type="time" 
                  id="end-time" 
                  value={convertTo24HourFormat(task.endTime)} 
                  readOnly 
                />
              </div>
            </div>
            <label htmlFor="date">Date:</label>
            <input 
              type="date" 
              id="date" 
              value={new Date(task.date * 1000).toISOString().split('T')[0]} 
              readOnly 
            />
            <div className="button-container">
              <button className="close-button" onClick={onClose}>
                Close
              </button>
            </div>
          </form>
        ) : (
          <p>Loading task details...</p>
        )}
      </div>
    </div>
  );
};

export default Read;
