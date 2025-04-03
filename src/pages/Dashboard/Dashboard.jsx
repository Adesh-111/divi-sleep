import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Dashboard.css";
import assets from "../../assets/assets";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Access logout function
  const [totalSleepToday, setTotalSleepToday] = useState("--");
  const [totalSleepWeekly, setTotalSleepWeekly] = useState("--");
  const [totalSleepMonthly, setTotalSleepMonthly] = useState("--");
  const [buttonText, setButtonText] = useState("Track your sleep");

  useEffect(() => {
    const startTime = localStorage.getItem("sleepStart");
    if (startTime) {
      setButtonText("Your restful state is active..");
    }
  }, [setButtonText]);

  useEffect(() => {
    const fetchSleepData = async (url, setData) => {
      try {
        if (!user?.token) {
          console.error("No token available");
          return;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        const duration = formatDuration(response.data.total_sleep);
        setData(duration);
      } catch (error) {
        console.error(
          `Error fetching sleep data from ${url}:`,
          error.response?.data || error.message
        );
      }
    };

    if (user?.token) {
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
        <p>
          Prioritize your rest and improve your well-being with better sleep
          tracking!
        </p>
        <img src={assets.Dashboard.curlyArrow} alt="curly arrow" />
        <a href="/tracker">
          <button>{buttonText}</button>
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
          <h3>{totalSleepWeekly}</h3>
        </div>
        <div className="dashboard-card">
          <p>Month</p>
          <h3>{totalSleepMonthly}</h3>
        </div>
      </div>
      <a href="/history" className="history-btn">
        <button>Show history</button>
      </a>
      {/* Logout Button */}
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
