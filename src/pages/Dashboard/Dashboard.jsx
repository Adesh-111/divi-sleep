import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalSleepToday, setTotalSleepToday] = useState("--");

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await axios.get("/api/sleep/today", {
          headers: { Authorization: `Bearer ${user}` },
        });
        setTotalSleepToday(response.data.total_sleep);
      } catch (error) {
        console.error("Error fetching sleep data:", error);
      }
    };

    if (user) {
      fetchSleepData();
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Sleep Dashboard</h1>
      <p>Track your sleep patterns and improve your sleep quality.</p>
      <h3>Quick Stats</h3>
      <p>Total Sleep Today: {totalSleepToday} hours</p>
    </div>
  );
};

export default Dashboard;