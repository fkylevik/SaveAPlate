import React, {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRotateRight} from '@fortawesome/free-solid-svg-icons';
import '../styles/TimeObject.css';

function TimerObject({ timer_duration }) {
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const endTimeRef = useRef(null);

    useEffect(() => {
        getDuration();
    }, [])

    const getDuration = async () => {
        try {
            const timerData = timer_duration;
            setDuration(timerData);
            setTimeLeft(timerData);
        }
        catch (err) {
            console.error("Error fetching timer data: ", err);
        }
    }

    useEffect(() => {
        let timer = null;

        if (isRunning) {
            if (!endTimeRef.current) {
                endTimeRef.current = Date.now() + timeLeft * 1000;
            }

            timer = setInterval(() => {
                const newTimeLeft = Math.round((endTimeRef.current - Date.now()) / 1000);

                if (newTimeLeft >= 0) {
                    setTimeLeft(newTimeLeft);
                } else {
                    setTimeLeft(0);
                    setIsRunning(false);
                    clearInterval(timer);
                }
            }, 500)
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const toggleTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            endTimeRef.current = null;
        } else {
            endTimeRef.current = Date.now() + timeLeft * 1000;
            setIsRunning(true);
        }
    }

    const resetTimer = () => {
        setTimeLeft(duration);
        endTimeRef.current = null;
        setIsRunning(false);
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const secondsLeft = seconds % 60;
        return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    };

    return (
        <div className={!isRunning && duration === timeLeft ? "timer-wrapper" : "timer-wrapper-running" }>
            <div className="timer-container">
                    <p>{formatTime(timeLeft)}</p>
                    <button onClick={toggleTimer} className="timer-buttons">{!isRunning ? <FontAwesomeIcon icon={faPlay} /> :  <FontAwesomeIcon icon={faPause} />}</button>
                    {duration !== timeLeft ? <button className="timer-buttons" onClick={resetTimer} disabled={duration === timeLeft}><FontAwesomeIcon icon={faRotateRight} /> </button> : null}
            </div>
        </div>
    );
}

export default TimerObject;