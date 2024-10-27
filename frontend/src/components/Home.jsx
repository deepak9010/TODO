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
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const today = new Date();
 console.log("todayyyyy", today)
   
  const getCurrentWeek = (date) => {
    const currentDay = date.getDay(); 
    const mondayOffset = (currentDay === 0 ? -6 : 1) - currentDay; 
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);

    // Create an array of the week
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); 

    return { weekDays, startOfWeek, endOfWeek };
  };

   // Get weekDays, startOfWeek, and endOfWeek
   const { weekDays, startOfWeek, endOfWeek } = getCurrentWeek(currentWeek);



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
   const fetchTaskCounts = async (startOfWeek, endOfWeek) => {
    try {
      const startTimestamp = Math.floor(startOfWeek.getTime() / 1000);
      const endTimestamp = Math.floor(endOfWeek.getTime() / 1000);

      console.log("Start of the week (timestamp):", startTimestamp);
      console.log("End of the week (timestamp):", endTimestamp);

      const completedResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/completed-count?start=${startTimestamp}&end=${endTimestamp}`
      );
      const completedData = await completedResponse.json();
      setCompletedTasks(completedData.completed_count);

      const pendingResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/pending-count?start=${startTimestamp}&end=${endTimestamp}`
      );
      const pendingData = await pendingResponse.json();
      setPendingTasks(pendingData.pending_count);
    } catch (error) {
      console.error('Error fetching task counts:', error);
    }
  };

  useEffect(() => {
    const { startOfWeek, endOfWeek } = getCurrentWeek(currentWeek);
    fetchTaskCounts(startOfWeek, endOfWeek);
}, [currentWeek]);

  
  // const handleUpdateTaskCounts = (completedCount, pendingCount) => {
  //   setCompletedTasks(completedCount);
  //   setPendingTasks(pendingCount);
  // };

  const handleDateClick = (date) => {
         // Log the clicked date as a Date object
    console.log("Clicked Date Object:", date);

    // Set the selected date as the date object (not a string)
    setSelectedDate(date);

    // Log the values for verification
    console.log("Original Date:", date.toString());
  
  };



  return (
    <>
      <div className="task-section">
        <div className="container mt-4">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h3>Manage your task here</h3>
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
                <li key={index} 
                className={`text-center mx-2 ${
                  date.toDateString() === today.toDateString() ? "current-day" : ""
                }`}
                onClick={() => handleDateClick(date)}
                
                >
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
       <Tasks
        // onUpdateCounts={handleUpdateTaskCounts} 
       selectedDate={selectedDate}
       fetchTaskCounts={fetchTaskCounts}
       weekStart={startOfWeek}
       weekEnd={endOfWeek}
       />
      
      </div>
    </>
  );
};

export default Home;
