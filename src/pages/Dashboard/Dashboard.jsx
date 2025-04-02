import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalSleepToday, setTotalSleepToday] = useState("--");
  const [totalSleepWeekly, setTotalSleepWeekly] = useState("--");
  const [totalSleepMonthly, setTotalSleepMonthly] = useState("--");

  useEffect(() => {
    const fetchSleepData = async (url, setData) => {
      try {
        const response = await axios.get(url, {
          headers: { 
            Authorization: user.token, 
            "Content-Type": "application/json"
          },
        });
        const duration = formatDuration(response.data.total_sleep);
        setData(duration);
      } catch (error) {
        console.error(`Error fetching sleep data from ${url}:`, error);
      }
    };

    if (user) {
      fetchSleepData("http://localhost:5000/api/sleep/today", setTotalSleepToday);
      fetchSleepData("http://localhost:5000/api/sleep/weekly", setTotalSleepWeekly);
      fetchSleepData("http://localhost:5000/api/sleep/monthly", setTotalSleepMonthly);
    }
  }, [user]);

  const formatDuration = (milliseconds) => {
    if (!milliseconds || isNaN(milliseconds)) {
      return "--";
    }
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="dashboard-container">
      <h1>🌙 Your Sleep Time 😴</h1>
      <p>Track your sleep patterns and improve your sleep quality.</p>
      <h3>Quick Stats</h3>
      <p>Total Sleep Today: {totalSleepToday}</p>
      <p>Total Sleep This Week: {totalSleepWeekly}</p>
      <p>Total Sleep This Month: {totalSleepMonthly}</p>
    </div>
  );
};

export default Dashboard;