import React from 'react';
import SearchableDropdown from "./SearchableDropdown.jsx";

function RecipeIngredientItem({ instruction, onChange, onDelete }) {
    return (
        <div className="recipe-ingredient-item">
            <h3>{instruction.step}.</h3>
            <input
                type="text"
                value={instruction.instruction}
                onChange={(e) => onChange('instruction', e.target.value)}
                placeholder="Add Instruction Step"
            />

            <button type="button" onClick={onDelete}>Delete</button>
        </div>
    );
}

export default RecipeIngredientItem;
