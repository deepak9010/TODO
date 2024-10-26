// src/components/Modal.js

import React from 'react';
import '../styles/modal.css'; 

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Task</h2>
        <form>
          <input type="text" placeholder="Task Title" required />
          <button type="submit">Create</button>
        </form>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
