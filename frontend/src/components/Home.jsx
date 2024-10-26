import React,{useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

import Reminder from "./Reminder";
import Tasks from "./Tasks";


import '../styles/home.css';

const Home = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  

  const getCurrentWeek = (date) => {
    const currentDay = date.getDay(); 
    const mondayOffset = (currentDay === 0 ? -6 : 1) - currentDay; 
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + mondayOffset);

    // Create an array of the week
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }

    return weekDays;
  };

  const weekDays = getCurrentWeek(currentWeek);

    // Function to navigate to the previous week
    const handlePreviousWeek = () => {
      const previousWeek = new Date(currentWeek);
      previousWeek.setDate(previousWeek.getDate() - 7);
      setCurrentWeek(previousWeek);
    };
  
    // Function to navigate to the next week
    const handleNextWeek = () => {
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setCurrentWeek(nextWeek);
    };


   // Function to fetch initial task counts
   const fetchTaskCounts = async () => {
    try {
      const completedResponse = await fetch(`${process.env.REACT_APP_API_URL}/completed-count`);
      const completedData = await completedResponse.json();
      setCompletedTasks(completedData.completed_count);

      const pendingResponse = await fetch(`${process.env.REACT_APP_API_URL}/pending-count`);
      const pendingData = await pendingResponse.json();
      setPendingTasks(pendingData.pending_count);
    } catch (error) {
      console.error('Error fetching task counts:', error);
    }
  };

  useEffect(() => {
    fetchTaskCounts(); 
  }, []);

  
  const handleUpdateTaskCounts = (completedCount, pendingCount) => {
    setCompletedTasks(completedCount);
    setPendingTasks(pendingCount);
  };

  return (
    <>
      <div className="task-section">
        <div className="container mt-4">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h3>Your Heading Here</h3>
            </div>
            <div className="col-sm-6 text-right">
              <div className="input-group  position-relative"> 
                <input 
                  type="text" 
                  className="form-control search-input" 
                  placeholder="Search..." 
                  aria-label="Search" 
                />
                <div className="input-group-append  position-absolute">
                  <span className="input-group-text">
                    <FaSearch className="search-icon" /> 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="current-week mt-4">
          <div className="week-navigation d-flex justify-content-between align-items-center">
            <button onClick={handlePreviousWeek} className="arrow-button">
              <FaArrowLeft />
            </button>
            <ul className="d-flex list-unstyled">
              {weekDays.map((date, index) => (
                <li key={index} className="text-center mx-2">
                  <div className="day">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                  <div className="date">{date.getDate()}</div>
                </li>
              ))}
            </ul>
            <button onClick={handleNextWeek} className="arrow-button">
              <FaArrowRight />
            </button>
          </div>
        </div>

       <Reminder completedTasks={completedTasks} pendingTasks={pendingTasks}/>
       <Tasks onUpdateCounts={handleUpdateTaskCounts}/>
      
      </div>
    </>
  );
};

export default Home;
