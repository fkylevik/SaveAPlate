import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import '../styles/CarbonFootprintChartStyle.css';

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

  <div className="chart-container">

    <div className="chart-text">
          <h3>What is a Carbon Footprint?</h3>
          <p>
            A <strong>carbon footprint</strong> measures the total amount of <strong>greenhouse gases (GHGs)</strong>—primarily carbon dioxide (CO₂), methane (CH₄), and nitrous oxide (N₂O)—emitted directly or indirectly by an activity, product, or person.
            In the context of <strong>food</strong>, it refers to the emissions generated throughout a product’s life cycle, from production and processing to transportation,  <strong> cooking</strong>, and disposal.
            <br />
            <br />
            This <strong> bar chart </strong> to the right displays the carbon footprint of three different recipes measured in kilograms of CO₂. It highlights how the environmental impact of meals can vary significantly based on ingredients:
            <br />
            <br />

            <strong> Tomato Basil Pasta </strong> shows the highest footprint, likely due to energy-intensive ingredients or preparation methods.
            <br />
            <strong> Berry Smoothie Bowl </strong> has a moderate footprint, common for fruit-based dishes.
            <br />
            <strong> Vegetable Stir Fry  </strong> has the lowest footprint, reflecting the efficiency of plant-based meals.
            <strong> Vegetable Stir Fry  </strong> has the lowest footprint, reflecting the efficiency of plant-based meals.


          </p>
        </div>
        <h1>Carbon Footprint Chart</h1>

    <Bar data={data} options={options} />
  </div>
);
}

export default CarbonFootprintChart;
