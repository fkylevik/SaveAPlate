import React, {useState} from "react";
import '../styles/TimerForm.css';


function TimerForm({ onTimeChange }) {
    const [input, setInput] = useState('');
    const [timerObject, setTimerObject] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const toggleTimer = () => {
        setTimerObject(prev => !prev);
        if (timerObject) {
            setTimerObject(false);
        }
    }

    /*const parseTime = (str) => {
        str = str.trim().toLowerCase();
        if (str.includes(':')) {
            const parts = str.split(':').map(Number);
            if (parts.some(isNaN)) {
                return null;
            }
            if (parts.length === 3) {
                return parts[0] * 3600 + parts[1] * 60 + parts[2];
            } else if (parts.length === 2) {
                return parts[0] * 60 + parts[1];
            } else if (parts.length === 1) {
                return parts[0];
            }
            return null;
        }

        let totalSeconds = 0;

        if (/^\d+$/.test(str)) {
            totalSeconds = parseInt(str, 10) * 60;
        } else {
            return null;
        }
        return totalSeconds;
    };*/


    const handleTimeChange = (h, m, s) => {
        const totalSeconds = h * 3600 + m * 60 + s;
        onTimeChange(totalSeconds);
    }

    return (
        <div className={timerObject ? "timer-wrapper-open" : "timer-wrapper-closed"}>
            {timerObject ?
                <div className="timer-container">
                    <p> Timer: </p>

                    <div className="timerTicker">
                        <div className="time-unit">
                            <button className="time-button-up" type="button" onClick={() => {const newHours = Math.min(59, hours + 1);
                                setHours(newHours);
                                handleTimeChange(newHours, minutes, seconds);}}>⏶</button>

                            <input className="time-input" type="number" readOnly value={hours} />

                            <button className="time-button-down" type="button" onClick={() =>{const newHours = Math.max(0, hours - 1);
                                setHours(newHours);
                                handleTimeChange(newHours, minutes, seconds);}}>⏷</button>

                            <label className="time-input-label">h</label>
                        </div>

                        <p>:</p>

                        <div className="time-unit">
                            <button className="time-button-up" type="button" onClick={() => {const newMin = Math.min(59, minutes + 1);
                                setMinutes(newMin);
                                handleTimeChange(hours, newMin, seconds);}}>⏶</button>

                            <input className="time-input" type="number" readOnly value={minutes} />

                            <button className="time-button-down" type="button" onClick={() => {const newMin = Math.max(0, minutes - 1);
                                setMinutes(newMin);
                                handleTimeChange(hours, newMin, seconds);}}>⏷</button>

                            <label className="time-input-label">min</label>
                        </div>

                        <p>:</p>

                        <div className="time-unit">


                            <button className="time-button-up" type="button" onClick={() => {const newSec = Math.min(30, seconds + 30);
                                setSeconds(newSec);
                                handleTimeChange(hours, minutes, newSec);}}>⏶</button>

                            <input className="time-input" type="number" readOnly value={seconds} />

                            <button className="time-button-down" type="button" onClick={() => {const newSec = Math.max(0, seconds - 30);
                                setSeconds(newSec);
                                handleTimeChange(hours, minutes, newSec);}}>⏷</button>

                            <label className="time-input-label">sec</label>
                        </div>
                    </div>
                </div>
                : null}


            <button
                type="button"
                onClick={toggleTimer}
                className={timerObject ? "delete-timer-button" : "add-timer-button"}
            >
                {timerObject ? "X" : "Add Timer"}
            </button>
        </div>
    )
}

export default TimerForm;