import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./SleepTracker.css";

const SleepTracker = () => {
  const { user, setButtonText } = useContext(AuthContext);
  const [sleepStart, setSleepStart] = useState(null);
  const [sleepEnd, setSleepEnd] = useState(null);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState("");
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startTime = localStorage.getItem("sleepStart");
    if (startTime) {
      setSleepStart(new Date(startTime));
      startTimer(new Date(startTime));
      setButtonText("Tracking...");
    }
  }, [setButtonText]);

  useEffect(() => {
    if (sleepStart && !sleepEnd) {
      navigate("/tracker");
    }
  }, [sleepStart, sleepEnd, navigate]);

  const startSleep = async () => {
    try {
      if (!user?.token) {
        setError("User token missing. Please log in again.");
        return;
      }

      const response = await axios.post(
        "https://divi-sleep-api.vercel.app/api/sleep/start",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const startTime = new Date(response.data.record.start_time);
      setSleepStart(startTime);
      setSleepEnd(null);
      setDuration(null);
      localStorage.setItem("sleepStart", startTime.toISOString());
      startTimer(startTime);

      // Navigate to the /tracker route
      navigate("/tracker");
    } catch (error) {
      console.error(
        "Error starting sleep session:",
        error.response?.data || error.message
      );
      setError("Error starting sleep session.");
    }
  };

  const endSleep = async () => {
    if (sleepStart) {
      try {
        if (!user?.token) {
          setError("User token missing. Please log in again.");
          return;
        }

        const response = await axios.post(
          "https://divi-sleep-api.vercel.app/api/sleep/end",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const endTime = new Date(response.data.record.end_time);
        setSleepEnd(endTime);
        setDuration(formatDuration(endTime - sleepStart));
        clearInterval(timerRef.current);
        localStorage.removeItem("sleepStart");
        setButtonText("Track your sleep");
        navigate("/dashboard");
      } catch (error) {
        console.error(
          "Error ending sleep session:",
          error.response?.data || error.message
        );
        if (error.response && error.response.status === 400) {
          setError("No active sleep session found.");
        } else {
          setError("Error ending sleep session.");
        }
      }
    }
  };

  const startTimer = (startTime) => {
    timerRef.current = setInterval(() => {
      const now = new Date();
      const elapsed = now - startTime;
      setDuration(formatDuration(elapsed));
    }, 1000);
  };

  const formatDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const clearTimer = () => {
    clearInterval(timerRef.current);
    setSleepStart(null);
    setSleepEnd(null);
    setDuration(null);
    localStorage.removeItem("sleepStart");
    setButtonText("Track your sleep");
  };

  return (
    <div className="sleep-tracker">
      <h1>DIVI Sleep?</h1>
      <h2>Did we sleep?</h2>
      <h3>Start to track your good time</h3>
      <div className="sleep-tracker-buttons">
        <button onClick={startSleep} disabled={sleepStart && !sleepEnd}>
          Start Peace
        </button>
        <button onClick={endSleep} disabled={!sleepStart || sleepEnd}>
          End Peace
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
      {duration && <p className="duration">{duration}</p>}
    </div>
  );
};

export default SleepTracker;
