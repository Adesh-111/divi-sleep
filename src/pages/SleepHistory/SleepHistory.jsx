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
        const response = await axios.get(
          "https://divi-sleep-api.vercel.app/api/sleep/history",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setSleepRecords(response.data.records);
      } catch (error) {
        console.error("Error fetching sleep history:", error);
      }
    };

    fetchSleepHistory();
  }, [user]);

  const formatDuration = (fractionalHours) => {
    const totalSeconds = fractionalHours * 3600;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 60).toFixed(0); // rounding to the nearest second
    return `${hours}hr ${minutes}min ${seconds}sec`;
  };

  return (
    <div className="sleep-history-container">
      <a href="/dashboard">
      <button className="back-btn">Back</button></a>
      <h1>Sleep History</h1>
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {sleepRecords.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.start_time).toLocaleDateString()}</td>
              <td>{new Date(record.start_time).toLocaleTimeString()}</td>
              <td>
                {record.end_time
                  ? new Date(record.end_time).toLocaleTimeString()
                  : "Ongoing"}
              </td>
              <td>
                {record.duration ? formatDuration(record.duration) : "Ongoing"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SleepHistory;
