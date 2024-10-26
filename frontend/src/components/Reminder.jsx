import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
import '../styles/reminder.css';

console.log('API URL:', `${process.env.REACT_APP_API_URL}/pending-count`);

const Reminder = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const totalTasks = completedTasks + pendingTasks; 
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  useEffect(() => {
    // Fetch completed tasks count
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/completed-count`);
        const data = await response.json();
        setCompletedTasks(data.completed_count); 
        // console.log('Completed Tasks:', data.completed_count);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    // Fetch pending tasks count
    const fetchPendingTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/pending-count`);
        const data = await response.json();
        setPendingTasks(data.pending_count);
        // console.log('Pending Tasks:', data.pending_count);  
      } catch (error) {
        console.error('Error fetching pending tasks:', error);
      }
    };

    fetchCompletedTasks();
    fetchPendingTasks();
  }, []);


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
