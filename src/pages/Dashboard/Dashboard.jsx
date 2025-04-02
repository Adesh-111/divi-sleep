import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Dashboard.css";
import assets from "../../assets/assets";

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
            "Content-Type": "application/json",
          },
        });
        const duration = formatDuration(response.data.total_sleep);
        setData(duration);
      } catch (error) {
        console.error(`Error fetching sleep data from ${url}:`, error);
      }
    };

    if (user) {
      fetchSleepData(
        "https://divi-sleep-api.vercel.app/api/sleep/today",
        setTotalSleepToday
      );
      fetchSleepData(
        "https://divi-sleep-api.vercel.app/api/sleep/weekly",
        setTotalSleepWeekly
      );
      fetchSleepData(
        "https://divi-sleep-api.vercel.app/api/sleep/monthly",
        setTotalSleepMonthly
      );
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
      <h1>DIVI Sleep?</h1>
      <h2>Did we sleep?</h2>
      <div className="track-now">
        {" "}
        <p>
          Prioritize your rest and improve your well-being with better sleep
          tracking!
        </p>
        <img src={assets.Dashboard.curlyArrow} alt="" />
        <a href="/tracker">
          <button>Track your sleep</button>
        </a>
      </div>
      <h4>🌙 Your Sleep Time 😴</h4>
      <h6>How many hours you slept</h6>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <p>Today</p>
          <h3>{totalSleepToday}</h3>
        </div>
        <div className="dashboard-card">
          <p>Week</p>
          <h3>{totalSleepMonthly}</h3>
        </div>
        <div className="dashboard-card">
          <p>Month</p>
          <h3>{totalSleepMonthly}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
