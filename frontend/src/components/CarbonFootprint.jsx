import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/CarbonFootprintChartStyle.css";
import LineChart from "./LineChart.jsx";


export default function CarbonFootprintChart() {
    const [completedRecipes, setCompletedRecipes] = useState([]);
    const [starttime, setStartTime] = useState(new Date());
    const [endtime, setEndTime] = useState(new Date());
    const [datapoints, setDataPoints] = useState([{}])

    const fetchCompletedRecipes = async () => {
        try {
            const res = await api.get(`/api/recipes/completed/?ordering=-time_completed`);
            setCompletedRecipes(res.data);
        } catch (error) {
            console.error("Error fetching completed recipes:", error);
        }
    }

    useEffect(() => {
        fetchCompletedRecipes();
    }, [starttime, endtime])

    const formatDataPoints = () => {
        const tempDatapoints = [];
        for ( const recipe of completedRecipes ) {
            tempDatapoints.push({
                x: recipe.time_completed,
                y: recipe.co2e
            })
        }
        setDataPoints(tempDatapoints);
    }

    useEffect(() => {
        formatDataPoints();
    }, [completedRecipes])

    const customSettings = {
        timespan: "week",
        datapoints: datapoints,
        y_label: "co2e",
        starttime: starttime,
        endtime: endtime,
    };


    return (
        <div>
            <h1>Line Chart displaying carbon footprint over time</h1>
            <input
                type="date"
                value={starttime}
                onChange={(e) => {setStartTime(e.target.value); console.log(starttime)}}
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