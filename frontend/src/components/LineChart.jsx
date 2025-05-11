import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

// x_unit "Day", "Week", "Month"
const LineChart = ({ params }) => {

    const data = {
        datasets: [
            {
                label: params.label,
                data: params.datapoints,
                fill: false,
                borderColor: "#2980b9",
                tension: 0.1
            }
        ]
    }

    const options = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: params.timespan,
                },
                title: {
                    display: true,
                    text: `Time (${params.timespan}s)`
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: params.y_label
                }
            }
        }
    }


    return (
        <div
            style={{
                width: "600px",
                height: "300px",
            }}
        >
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart;
