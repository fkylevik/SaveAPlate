import React, {useState} from 'react';
import '../styles/CreateRecipe.css';
import TimerForm from "./TimerForm.jsx";
import SearchableDropdown from "./SearchableDropdown.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

function RecipeIngredientItem({ instruction, onChange, onDelete }) {

    const handleTimerChange = (newTime) => {
        instruction.timer = newTime;
    };

    return (
        <div className="recipe-instruction-item">
            <h3>{instruction.step}.</h3>
            <textarea className="instructions-textarea"
                value={instruction.instruction}
                onChange={(e) => onChange('instruction', e.target.value)}
                placeholder="Add Instruction Step"
            />

            <button
                className="recipe-instruction-item-button"
                type="button"
                onClick={onDelete}
                title="Delete instruction"
            >
                <i className="fa-solid fa-trash fa-2x"></i>
            </button>
            <div>
                <TimerForm
                    onTimeChange={handleTimerChange}
                />
            </div>
        </div>
    );
}

export default RecipeIngredientItem;
