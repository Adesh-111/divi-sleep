import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalSleepToday, setTotalSleepToday] = useState("--");

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sleep/today", {
          headers: { 
            Authorization: user, 
            "Content-Type": "application/json"
          },
        });
        const duration = formatDuration(response.data.total_sleep);
        setTotalSleepToday(duration);
      } catch (error) {
        console.error("Error fetching sleep data:", error);
      }
    };

    if (user) {
      fetchSleepData();
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
      <h1>Welcome to Your Sleep Dashboard</h1>
      <p>Track your sleep patterns and improve your sleep quality.</p>
      <h3>Quick Stats</h3>
      <p>Total Sleep Today: {totalSleepToday}</p>
    </div>
  );
};

export default Dashboard;