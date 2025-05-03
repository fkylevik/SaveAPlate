import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import '../styles/CarbonFootprintChartStyle.css';
import api from "../api";


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
        getRecipes();
   }, []);

 const getRecipes = async () => {
         try {
            const res = await api.get(`/api/recipes/`);
            const allRecipes=res.data;
            if (allRecipes.length < 4) {//If there is less than 4 recipes display them all on the chart
                setRecipes(allRecipes);
                return;
            }
        //If there is more than 4 recipes in the database display the recipes with the
        // highest resp. the lowest CarbonFootprint + 2 random recipes (excluding the highest and lowest)
            const sorted = [...allRecipes].sort((a, b) => a.total_co2e - b.total_co2e);
            const lowestCO2 = sorted[0];
            const highestCO2 = sorted[sorted.length - 1];
            const remaining = allRecipes.filter(r => r.id !== lowestCO2.id && r.id !== highestCO2.id);
            const randoms = remaining.sort(() => 0.5 - Math.random()).slice(0, 2);
            setRecipes([lowestCO2, highestCO2, ...randoms]);

         } catch (err) {
             console.error("Error searching recipes:", err);
         }
    };


  // Prepare data for the bar chart:
  const data = {
    labels: recipes.map(recipe => `${recipe.name} `),
    datasets: [
      {
        label: "Carbon Footprint (kg CO₂e)",
        data: recipes.map(recipe => recipe.total_co2e),
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
    color:"black",

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        color:"black",
        text: "Carbon Footprint per Recipe per Portion",
        font: {
            size: 16,
            weight: "bold",
        },
      },
    },
    scales: {
       x: {
           beginAtZero: true,

       },
      y: {
        beginAtZero: true,
        ticks: {
            color: "black",
            callback: function(value) {
                return `${value} kg CO₂`;
            },
            },
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
