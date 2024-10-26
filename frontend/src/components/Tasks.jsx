import React, { useState } from 'react'; 
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Import icons for edit and delete
import '../styles/task.css';

import Modal from "./Modal";

const Tasks = () => {
    const [isModalOpen, setModalOpen] = useState(false);
  const tasks = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
    { id: 3, title: 'Task 3' },
    { id: 4, title: 'Task 4' },
    { id: 5, title: 'Task 5' },
    { id: 6, title: 'Task 6' },
    { id: 7, title: 'Task 7' },
    { id: 8, title: 'Task 8' },
    { id: 9, title: 'Task 9' },
    { id: 10, title: 'Task 10' },
  ];

  
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
            <div className="task-item d-flex align-items-center" key={task.id}>
              <div className="checkbox-label-container d-flex align-items-center">
                <input type="checkbox" id={`task-${task.id}`} />
                <label htmlFor={`task-${task.id}`} className="task-title">{task.title}</label>
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
