import { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import api from "../api";
import "../styles/CarbonFootprintChartStyle.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CarbonFootprintChart() {
  const [completions, setCompletions] = useState([]);
  const [colors, setColors] = useState({
    background: "#3498db",
    border: "#2980b9",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read CSS vars once
    const root = getComputedStyle(document.documentElement);
    setColors({
      background: root.getPropertyValue("--primary-color")?.trim() || "#3498db",
      border: root.getPropertyValue("--secondary-color")?.trim() || "#2980b9",
    });

    // Fetch completed recipes
    (async () => {
      try {
        const { data } = await api.get("/api/completedrecipes/");
        const latest4 = data
          .sort(
            (a, b) => new Date(b.time_completed) - new Date(a.time_completed)
          )
          .slice(0, 4);
        setCompletions(latest4);
      } catch (err) {
        console.error("Failed to load completions:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const chartData = useMemo(
    () => ({
      labels: completions.map((c) => c.recipe_name),
      datasets: [
        {
          label: "CO₂e per Completed Portion",
          data: completions.map((c) => c.co2e),
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ],
    }),
    [completions, colors]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Your Last 4 Recipe Carbon Footprints",
          font: { size: 16, weight: "bold" },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (v) => `${v} kg CO₂` },
        },
      },
    }),
    []
  );

  return (
    <div className="chart-container">

      <div className="chart-explanation">
        <p>
          Chart shows carbon footprint of completed recipes (in kg CO₂e per portion).
          Lower values indicate greener meals.
        </p>
      </div>

      {loading ? (
        <p>Loading your completed recipes...</p>
      ) : (
        <>
          {completions.length === 0 && (
            <p>
              You haven’t completed any recipes yet. Cook something to see its
              carbon footprint here.
            </p>
          )}

          <Bar data={chartData} options={options} />

          {completions.length > 0 && (
            <div className="chart-legend-text">
              {completions.map((c) => (
                <p key={c.id}>
                  <strong>{c.recipe_name}</strong> on{' '}
                  {new Date(c.time_completed).toLocaleDateString()}: {c.co2e}{' '}
                  kg CO₂e
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}