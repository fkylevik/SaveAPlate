import React from 'react';
import SearchableDropdown from "./SearchableDropdown.jsx";
import '../styles/CreateRecipe.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



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
            <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => onChange('unit', e.target.value)}
                placeholder="Unit.."
                className="recipe-ingredient-item-unit"
            />

            <button className="recipe-ingredient-item-button" type="button" onClick={onDelete}>
                <i className="fa-solid fa-trash fa-2x"></i></button>

        </div>
    );
}

export default RecipeIngredientItem;
