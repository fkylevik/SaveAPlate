import React from 'react';
import SearchableDropdown from "./SearchableDropdown.jsx";

function RecipeIngredientItem({ ingredient, onChange, onDelete }) {
    return (
        <div className="recipe-ingredient-item">
            <SearchableDropdown
                searchPlaceholder="Enter Ingredient"
                endpoint="ingredients"
                value={ingredient.name}
                onSelect={(option) => onChange('ingredient', option)}
            />
            <input
                type="text"
                value={ingredient.amount}
                onChange={(e) => onChange('amount', e.target.value)}
                placeholder="Amount"
            />
            <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => onChange('unit', e.target.value)}
                placeholder="Unit"
            />
            <button type="button" onClick={onDelete}>Delete</button>
        </div>
    );
}

export default RecipeIngredientItem;
