import React, {useState} from "react";


function TimerForm({ onTimeChange }) {
    const [input, setInput] = useState('');
    const [timerObject, setTimerObject] = useState(false);

    const toggleTimer = () => {
        setTimerObject(prev => !prev);
        if (timerObject) {
            setTimerObject(false);
        }
    }

    const parseTime = (str) => {
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
    };


    const handleTimeChange = (newTime) => {
        setInput(newTime);
        const seconds = parseTime(newTime);
        if (seconds === null) {
            onTimeChange(0);
        } else {
            onTimeChange(seconds);
        }
    }

    return (
        <div>
            {timerObject ?
                <input
                    type="text"
                    value={input}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    placeholder="Time: hh:mm:ss"
                    min="1"
                    className="recipe-instruction-item-timer"
                />
                : null}

            <button
                type="button"
                onClick={toggleTimer}
                className={timerObject ? "delete-timer-button" : "add-timer-button"}
            >
                {timerObject ? "Delete Timer" : "Add Timer"}
            </button>
        </div>
    )
}

export default TimerForm;