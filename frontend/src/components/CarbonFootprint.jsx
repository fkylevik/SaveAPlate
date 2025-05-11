import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/CarbonFootprintChartStyle.css";
import LineChart from "./LineChart.jsx";


export default function CarbonFootprintChart() {
    const [completedRecipes, setCompletedRecipes] = useState([]);
    const [starttime, setStartTime] = useState("2025-05-11");
    const [endtime, setEndTime] = useState("2025-05-18");
    const [datapoints, setDataPoints] = useState([{}])

    const customSettings = {
        timespan: "year",
        y_label: "co2e",
        datapoints,
        starttime,
        endtime,
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
    }, [customSettings])



    useEffect(() => {
        const formatDataPoints = () => {
            const tempDatapoints = [];
            for ( const recipe of completedRecipes ) {
                tempDatapoints.push({
                    x: recipe.time_completed,
                    y: recipe.co2e
                })
            }
            setDataPoints(tempDatapoints);
        };
        formatDataPoints();
    }, [completedRecipes])

    return (
        <div>
            <h1>Line Chart displaying carbon footprint over time</h1>
            <input
                type="date"
                value={starttime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <input
                type="date"
                value={endtime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            <LineChart params={customSettings}/>
        </div>
    );
}