import React, {useState} from 'react';
import '../styles/CreateRecipe.css';
import TimerForm from "./TimerForm.jsx";


function RecipeIngredientItem({ instruction, onChange, onDelete }) {
    const [time, setTime] = useState(null);

    const handleTimerChange = (newTime) => {
        instruction.timer = newTime;
    };

    const handleFormattedTime = (time) => {
        if (time === null) {
            setTime(null);
        }
        setTime(time);
    }

    return (
        <div className="recipe-ingredient-item">
            <h3>{instruction.step}.</h3>
            <input
                type="text"
                value={instruction.instruction}
                onChange={(e) => onChange('instruction', e.target.value)}
                placeholder="Add Instruction Step"
            />
            <div>
                <TimerForm
                    onTimeChange={handleTimerChange}
                />
            </div>

            <button type="button" className="recipe-instruction-item-button" onClick={onDelete}>
                <i className="fa-solid fa-trash fa-2x"></i></button>

        </div>
    );
}

export default RecipeIngredientItem;
