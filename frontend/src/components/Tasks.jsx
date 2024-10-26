import React, { useState, useEffect } from 'react'; 
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Import icons for edit and delete
import '../styles/task.css';

import Modal from "./Modal";

const Tasks = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]); 
  
      // Fetch tasks from the API
      useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
                const data = await response.json();
                
                if (response.ok) {
                    // console.log('Tasks:', data.data);
                    setTasks(data.data); 
                } else {
                    console.error('Error fetching tasks:', data.message);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);
  

        // Handle checkbox change to update task status
     const handleCheckboxChange = async (taskId, currentStatus) => {
          const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
          
          try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/edit/${taskId}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ status: newStatus })
              });
              
              if (response.ok) {
                  setTasks((prevTasks) => 
                      prevTasks.map((task) =>
                          task._id === taskId ? { ...task, status: newStatus } : task
                      )
                  );
              } else {
                  console.error('Error updating task status');
              }
          } catch (error) {
              console.error('Error updating task status:', error);
          }
      };

  
  const handleCreateClick = () => {
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
  };

  return (
    <>
      <div className="tasks-container">
        <div className="tasks-header d-flex justify-content-between align-items-center">
          <h3>Tasks Today</h3>
          <button className="create-button" onClick={handleCreateClick}>Create</button>
        </div>

        <div className="tasks-list">
          {tasks.map((task) => (
            <div className="task-item d-flex align-items-center" key={task._id}>
              <div className="checkbox-label-container d-flex align-items-center">
                <input 
                type="checkbox"
                 id={`task-${task._id}`}
                 checked={task.status === 'completed'}
                 onChange={() => handleCheckboxChange(task._id, task.status)}                 
                 />
                <label htmlFor={`task-${task._id}`} className="task-title">{task.title}</label>
              </div>
              <div className="task-icons">
                <FaEye className="icon view-icon" title="View Details" />
                <FaEdit className="icon edit-icon"title="Edit Details" />
                <FaTrash className="icon delete-icon" title="Delete" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Tasks;
