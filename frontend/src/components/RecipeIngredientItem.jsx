import React from 'react';
import SearchableDropdown from "./SearchableDropdown.jsx";
import '../styles/CreateRecipe.css';
import UnitSelector from "./UnitSelector.jsx";



function RecipeIngredientItem({ ingredient, onChange, onDelete }) {
    return (
        <div className="recipe-ingredient-item">
            <SearchableDropdown
                searchPlaceholder="Enter Ingredient.."
                endpoint="ingredients"
                value={ingredient.ingredient} // Pass the full `ingredient` object
                onSelect={(option) => onChange('ingredient', option)} // Updates the `ingredient` field with the selected object
            />

            <input
                type="text"
                value={ingredient.amount}
                onChange={(e) => onChange('amount', e.target.value)}
                placeholder="Amount.."
                className="recipe-ingredient-item-amount"
            />
            <UnitSelector
                ingredient={ingredient.ingredient}
                value={ingredient.unit}
                onSelect={(unit) => onChange('unit', unit)}
                className="unit-selector"
            />
            <button
                className="recipe-ingredient-item-button"
                type="button"
                onClick={onDelete}
                title="Delete ingredient"
            >
                <i className="fa-solid fa-trash fa-2x"></i>
            </button>

        </div>
    );
}

export default RecipeIngredientItem;
