import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import your API helper when backend is ready
// import api from "../api";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CarbonFootprintChart() {
  // State to hold recipes data
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // For now, we are using dummy data.

    const dummyData = [
      { id: 1, name: "Vegetable Stir Fry", carbon_footprint_kg_co2e: 12, created_at: "2025-04-01" },
      { id: 2, name: "Tomato Basil Pasta", carbon_footprint_kg_co2e: 34, created_at: "2025-04-02" },
      { id: 3, name: "Berry Smoothie Bowl", carbon_footprint_kg_co2e: 18, created_at: "2025-04-03" },
    ];
    setRecipes(dummyData);
  }, []);

  // Prepare data for the bar chart:
  const data = {
    labels: recipes.map(recipe => `${recipe.name} (${recipe.created_at})`),
    datasets: [
      {
        label: "Carbon Footprint (kg CO₂e)",
        data: recipes.map(recipe => recipe.carbon_footprint_kg_co2e),
        // Get CSS variables through computed style
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
        borderWidth: 1,
      }
    ]
  };

  // Chart options for styling and responsiveness
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Carbon Footprint per Recipe Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Carbon Footprint Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default CarbonFootprintChart;
