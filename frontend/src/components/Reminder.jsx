import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
import '../styles/reminder.css';

console.log('API URL:', `${process.env.REACT_APP_API_URL}/pending-count`);

const Reminder = ({ completedTasks, pendingTasks }) => {

  const totalTasks = completedTasks + pendingTasks; 
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;



  return (
    <>
      <div className="task-status mt-4">
        <div className="task-complete">
          <div className="task-complete-info d-flex align-items-center">
            <FaCheckCircle className="status-icon" />
            <span className="task-text">Task Complete</span>
          </div>
          <div className="task-number-info d-flex align-items-center">
            <span className="task-number">{completedTasks}</span> 
            <span className="task-week">This Week</span>
          </div>
        </div>

        <div className="task-incomplete">
          <div className="task-incomplete-info d-flex align-items-center">
            <FaTimesCircle className="status-icon" />
            <span className="task-text">Task Incomplete</span>
          </div>
          <div className="task-number-info d-flex align-items-center">
            <span className="task-number">{pendingTasks}</span> 
            <span className="task-week">This Week</span>
          </div>
        </div>
      </div>


      <div className="mt-4 allProgrss">
      <h5>Weekly Progress</h5>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
          </div>
        </div>
    </div>
    </>
  );
};

export default Reminder;
