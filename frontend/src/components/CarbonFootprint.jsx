import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/CarbonFootprint.css";
import LineChart from "./LineChart.jsx";

export default function CarbonFootprintChart() {
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [starttime, setStartTime] = useState("2025-05-10");
  const [endtime, setEndTime]     = useState("2025-05-19");

  // your dummy series
const dummyData = [
  { x: "2025-05-10", y: 0.60 },
  { x: "2025-05-11", y: 0.58 },
  { x: "2025-05-12", y: 0.7 },
  { x: "2025-05-13", y: 0.56 },
  { x: "2025-05-14", y: 0.43 },
  { x: "2025-05-15", y: 0.55 }, 
  { x: "2025-05-16", y: 0.48 },
  { x: "2025-05-17", y: 0.45 },
  { x: "2025-05-18", y: 0.42 },
  { x: "2025-05-19", y: 0.40 },
];

  // Helper to wrap any series with the null‐point boundaries
  const withBounds = series => [
    { x: starttime, y: null },
    ...series,
    { x: endtime,   y: null }
  ];

  // State starts out with the dummy + bounds
  const [data, setData] = useState(() => withBounds(dummyData));

  // Fetch real recipes once
  useEffect(() => {
    async function fetchCompleted() {
      try {
        const res = await api.get(`/api/recipes/completed/?ordering=-time_completed`);
        setCompletedRecipes(res.data);
      } catch (err) {
        console.error("Error fetching completed recipes:", err);
      }
    }
    fetchCompleted();
  }, []);

  // When real data arrives, replace the dummy
  // Also re-apply bounds if user changes the dates
  useEffect(() => {
    if (completedRecipes.length > 0) {
      const realSeries = completedRecipes.map(r => ({
        x: r.time_completed,
        y: r.co2e
      }));
      setData(withBounds(realSeries));
    }
  }, [completedRecipes, starttime, endtime]);

  const customSettings = {
    label:   "Carbon Footprint over Time",
    timespan:"day",
    y_label: "co2e",
    datapoints: data,
    lineColor: "var(--green-color)"
  };

  return (
    <div className="CarbonFootprintChart">
      <h1>Carbon Footprint Over Time</h1>

      <div className="carbon-chart">
        <LineChart params={customSettings} />
      </div>

      <div className="date-input-container">
        <div>
          <h2>Start Date</h2>
          <input
            type="date"
            className="date-input"
            value={starttime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <h2>End Date</h2>
          <input
            type="date"
            className="date-input"
            value={endtime}
            onChange={e => setEndTime(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
