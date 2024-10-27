import React, { useState, useEffect } from 'react'; 
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Import icons for edit and delete
import '../styles/task.css';

import Modal from "./Modal";
import Read from "./Read"

const Tasks = ({ onUpdateCounts, selectedDate,fetchTaskCounts,weekStart, weekEnd  }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isReadOpen, setReadOpen] = useState(false);
    const [tasks, setTasks] = useState([]); 
    const [editableId, setEditableId] = useState(null);
  

        const fetchTasks = async () => {
          if (!selectedDate) return; 
          // const timestamp = Math.floor(selectedDate.getTime() / 1000);
          const timestamp = Math.floor((selectedDate.getTime() + (5.5 * 60 * 60 * 1000)) / 1000);
          

            // Log the selected date and its timestamp
        console.log("Selected Date:", selectedDate.toLocaleDateString());
        console.log("Selected Date Timestamp:", timestamp);
    
    
          try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/date/${timestamp}`);
              const data = await response.json();
              
               // Log the API response
              console.log('API Response:', data);
    
              if (response.ok) {
                  setTasks(data.data); 
              } else {
                  console.error('Error fetching tasks:', data.message);
              }
          } catch (error) {
              console.error('Error fetching tasks:', error);
          }
      };
  
      useEffect(() => {
          fetchTasks();
      }, [selectedDate]);
     
      const handleCheckboxChange = async (taskId, currentStatus, taskDate) => {
          const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
          
          try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/edit/${taskId}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    status: newStatus,
                    date: taskDate 
                })
              });
              
              if (response.ok) {
                setTasks((prevTasks) => {
                  return prevTasks.map((task) => 
                      task._id === taskId ? { ...task, status: newStatus } : task
                  );
              });
                 
                //    // Log the updated tasks
                // console.log('Updated Tasks:', updatedTasks);

                //   // Update counts based on the updated tasks
                //   const completedCount = updatedTasks.filter(task => task.status === 'completed').length;
                //   const pendingCount = updatedTasks.length - completedCount;
        
                //   // Call the function passed from Home to update counts
                //   onUpdateCounts(completedCount, pendingCount);


        
                //   return updatedTasks;
                // });
                console.log("Fetching task counts for the week:");

                console.log("Week Start (date and time):", weekStart.toLocaleString());
                console.log("Week End (date and time):", weekEnd.toLocaleString());


                console.log("Week Start (epoch):", Math.floor(weekStart.getTime() / 1000));
                console.log("Week End (epoch):", Math.floor(weekEnd.getTime() / 1000));

                fetchTaskCounts(weekStart, weekEnd);


                // Fetch updated task counts using weekStart and weekEnd
                // await fetchTasks();
               
                
                
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

  const handleReadClick = (taskId) => {
    setEditableId(taskId); 
    setReadOpen(true); 
};

const handleCloseReadModal = () => {
  setReadOpen(false);
  setEditableId(null); 
};

  return (
    <>
      <div className="tasks-container">
        <div className="tasks-header d-flex justify-content-between align-items-center">
          <h3>Tasks Today</h3>
          <button className="create-button" onClick={handleCreateClick}>Create</button>
        </div>

        <div className="tasks-list">
        {tasks.length === 0 ? ( 
                        <div className="no-tasks-message">No tasks available for this day.</div>
                    ) : (
                        tasks.map((task) => (
                            <div className="task-item d-flex align-items-center" key={task._id}>
                                <div className="checkbox-label-container d-flex align-items-center">
                                    <input 
                                        type="checkbox"
                                        id={`task-${task._id}`}
                                        checked={task.status === 'completed'}
                                        onChange={() => handleCheckboxChange(task._id, task.status, task.date)}                 
                                    />
                                    <label htmlFor={`task-${task._id}`} className="task-title">{task.title}</label>
                                </div>
                                <div className="task-icons">
                                    {/* <FaEye className="icon view-icon" title="View Details"
                                      
                                       /> */}
                                    <FaEdit className="icon edit-icon" title="Edit Details" 
                                    onClick={() => handleReadClick(task._id)}
                                     />
                                    <FaTrash className="icon delete-icon" title="Delete" />
                                </div>
                            </div>
                        ))
                    )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} fetchTasks={fetchTasks}/>
      <Read isOpen={isReadOpen} onClose={handleCloseReadModal} taskId={editableId} fetchTasks={fetchTasks}/>
    </>
  );
};

export default Tasks;
