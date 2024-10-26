import React from "react";
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; 

import Reminder from "./Reminder";
import Tasks from "./Tasks";

import '../styles/home.css';

const Home = () => {

  const getCurrentWeek = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Get current day (0-6)
    const mondayOffset = (currentDay === 0 ? -6 : 1) - currentDay; // Calculate offset to get Monday
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() + mondayOffset);

    // Create an array of the week
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }

    return weekDays;
  };

  const weekDays = getCurrentWeek();
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
            <ul>
              {weekDays.map((date, index) => (
                <li key={index}>
                      <div className="day">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                      <div className="date">{date.getDate()}</div>
                </li>
              ))}
            </ul>
          </div>

       <Reminder/>
       <Tasks/>
      </div>
    </>
  );
};

export default Home;
