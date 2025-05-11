import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/CarbonFootprint.css";
import LineChart from "./LineChart.jsx";


export default function CarbonFootprintChart() {
    const [completedRecipes, setCompletedRecipes] = useState([]);
    const [starttime, setStartTime] = useState("2025-05-10");
    const [endtime, setEndTime] = useState("2025-05-19");
    const [data, setData] = useState([{}])

    const dummyData = [
        {x: "2025-05-10", y: 0.050},
        {x: "2025-05-11", y: 0.034},
        {x: "2025-05-12", y: 0.026},
        {x: "2025-05-13", y: 0.030},
        {x: "2025-05-14", y: 0.040},
        {x: "2025-05-15", y: 0.040},
        {x: "2025-05-16", y: 0.050},
    ]

    const customSettings = {
        label: "Carbon Footprint over Time",
        timespan: "day",
        y_label: "co2e",
        datapoints: [{x: starttime, y: null}].concat(dummyData, [{x: endtime, y: null}]) // switch dummyData to data in prod
    };

    useEffect(() => {
        const fetchCompletedRecipes = async () => {
            try {
                const res = await api.get(`/api/recipes/completed/?ordering=-time_completed`);
                setCompletedRecipes(res.data);
            } catch (error) {
                console.error("Error fetching completed recipes:", error);
            }
        };
        fetchCompletedRecipes();
    }, []);

    useEffect(() => {
        const formatDataPoints = () => {
            const tempDatapoints = [];
            for ( const recipe of completedRecipes ) {
                tempDatapoints.push({
                    x: recipe.time_completed,
                    y: recipe.co2e
                })
            }
            setData(tempDatapoints);
        };
        formatDataPoints();
    }, [completedRecipes])

    return (
        <div>
            <h1>Line Chart Displaying Carbon Footprint Over Time</h1>
            <div className="date-input-container">
                <h2>Start Date</h2>
                <input
                    className="date-input"
                    type="date"
                    value={starttime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </div>

            <div className="date-input-container">
                <h2>End Date</h2>
                <input
                    className="date-input"
                    type="date"
                    value={endtime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
            <LineChart params={customSettings} className="carbon-chart"/>
        </div>
    );
}