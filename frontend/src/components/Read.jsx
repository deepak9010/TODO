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

const Read = ({ isOpen, onClose, taskId, fetchTasks }) => {
    const [task, setTask] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false); 

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

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleUpdateTask = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/edit/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setTask(updatedTask.data);
                fetchTasks(); 
                setIsEditMode(false); 
                onClose();
            } else {
                console.error('Error updating task:', await response.json());
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

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
                            readOnly={!isEditMode} 
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                        />
                        <textarea 
                            placeholder="Description" 
                            value={task.description} 
                            rows="2" 
                            readOnly={!isEditMode}
                            onChange={(e) => setTask({ ...task, description: e.target.value })} 
                        />
                        <div className="status-priority-container">
                            <div className="status-container">
                                <label htmlFor="status">Status:</label>
                                <select 
                                    id="status" 
                                    value={task.status} 
                                    onChange={(e) => setTask({ ...task, status: e.target.value })} 
                                    disabled={!isEditMode}
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
                                    onChange={(e) => setTask({ ...task, priority: e.target.value })} 
                                    disabled={!isEditMode}
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
                                    readOnly={!isEditMode}
                                    onChange={(e) => setTask({ ...task, startTime: e.target.value })} 
                                />
                            </div>
                            <div className="end-time-container">
                                <label htmlFor="end-time">End Time:</label>
                                <input 
                                    type="time" 
                                    id="end-time" 
                                    value={convertTo24HourFormat(task.endTime)} 
                                    readOnly={!isEditMode}
                                    onChange={(e) => setTask({ ...task, endTime: e.target.value })} 
                                />
                            </div>
                        </div>
                        <label htmlFor="date">Date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            value={new Date(task.date * 1000).toISOString().split('T')[0]} 
                            readOnly={!isEditMode}
                            onChange={(e) => setTask({ ...task, date: new Date(e.target.value).getTime() / 1000 })} 
                        />
                        <div className="button-container">
                            {isEditMode ? (
                                <button type="button" onClick={handleUpdateTask}>Save Changes</button> 
                            ) : (
                                <button type="button" onClick={handleEditClick}>Edit</button> 
                            )}
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
