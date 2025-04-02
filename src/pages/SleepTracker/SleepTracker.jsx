import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./SleepTracker.css";

const SleepTracker = () => {
  const { user } = useContext(AuthContext);
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
    }
  }, []);

  const startSleep = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/sleep/start", {}, {
        headers: { 
          "Authorization": user.token,
        },
      });
      const startTime = new Date(response.data.record.start_time);
      setSleepStart(startTime);
      setSleepEnd(null);
      setDuration(null);
      localStorage.setItem("sleepStart", startTime.toISOString());
      startTimer(startTime);
    } catch (error) {
      setError("Error starting sleep session.");
    }
  };

  const endSleep = async () => {
    if (sleepStart) {
      try {
        const response = await axios.post("http://localhost:5000/api/sleep/end", {}, {
          headers: { 
           "Authorization": user.token
          },
        });
        const endTime = new Date(response.data.record.end_time);
        setSleepEnd(endTime);
        setDuration(formatDuration(endTime - sleepStart));
        clearInterval(timerRef.current);
        localStorage.removeItem("sleepStart");
        navigate("/dashboard"); 
      } catch (error) {
        setError("Error ending sleep session.");
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

  return (
    <div className="sleep-tracker">
      <h1>DIVI Sleep?</h1>
      <h2>Did we sleep?</h2>
      <h3>Sleep Tracker</h3>
      <button onClick={startSleep} disabled={sleepStart && !sleepEnd}>Start Sleep</button>
      <button onClick={endSleep} disabled={!sleepStart || sleepEnd}>End Sleep</button>
      {error && <p className="error-text">{error}</p>}
      {duration && <p>Total Sleep: {duration}</p>}
    </div>
  );
};

export default SleepTracker;