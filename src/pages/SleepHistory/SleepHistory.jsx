import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./SleepHistory.css";

const SleepHistory = () => {
  const { user } = useContext(AuthContext);
  const [sleepRecords, setSleepRecords] = useState([]);

  useEffect(() => {
    const fetchSleepHistory = async () => {
      if (!user || !user.token) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/sleep/history", {
          headers: { Authorization:user.token},
        });
        setSleepRecords(response.data.records);
      } catch (error) {
        console.error("Error fetching sleep history:", error);
      }
    };

    fetchSleepHistory();
  }, [user]);

  return (
    <div className="sleep-history-container">
      <h1>Sleep History</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration (hours)</th>
          </tr>
        </thead>
        <tbody>
          {sleepRecords.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.start_time).toLocaleDateString()}</td>
              <td>{new Date(record.start_time).toLocaleTimeString()}</td>
              <td>{record.end_time ? new Date(record.end_time).toLocaleTimeString() : "Ongoing"}</td>
              <td>{record.duration ? (record.duration / 3600).toFixed(2) : "Ongoing"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SleepHistory;