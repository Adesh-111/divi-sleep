import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./SleepTracker.css";

const SleepTracker = () => {
  const { user } = useContext(AuthContext);
  const [sleepStart, setSleepStart] = useState(null);
  const [sleepEnd, setSleepEnd] = useState(null);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState("");

  const startSleep = async () => {
    try {
      const response = await axios.post("/api/sleep/start", {}, {
        headers: { Authorization: `Bearer ${user}` },
      });
      setSleepStart(new Date(response.data.record.start_time));
      setSleepEnd(null);
      setDuration(null);
    } catch (error) {
      setError("Error starting sleep session.");
    }
  };

  const endSleep = async () => {
    if (sleepStart) {
      try {
        const response = await axios.post("/api/sleep/end", {}, {
          headers: { Authorization: `Bearer ${user}` },
        });
        const endTime = new Date(response.data.record.end_time);
        setSleepEnd(endTime);
        setDuration(((endTime - sleepStart) / (1000 * 60 * 60)).toFixed(2));
      } catch (error) {
        setError("Error ending sleep session.");
      }
    }
  };

  return (
    <div className="sleep-tracker-container">
      <h2>Sleep Tracker</h2>
      <button onClick={startSleep} disabled={sleepStart && !sleepEnd}>Start Sleep</button>
      <button onClick={endSleep} disabled={!sleepStart || sleepEnd}>End Sleep</button>
      {error && <p className="error-text">{error}</p>}
      {duration && <p>Total Sleep: {duration} hours</p>}
    </div>
  );
};

export default SleepTracker;