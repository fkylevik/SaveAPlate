import "../styles/SelectIngredients.css";
import { useState } from "react";
import SearchableDropdown from "./SearchableDropdown.jsx";
import api from "../api.js";

function SelectIngredients({ onRecipesUpdate }) {
    const [ingredients, setIngredients] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleAddIngredient = () => {
        if (!selectedOption) return; // if no option is selected, no action is performed
        const exists = ingredients.some(ing => ing.id === selectedOption.id);
        if (exists) return; // if already added, do not add again
        setIngredients([...ingredients, selectedOption]);
        setSelectedOption(null);
    };

    const handleDeleteIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSearchRecipes = async () => {
        try {
            const ingredientIds = ingredients.map((ing) => ing.id).join(",");
            const query = `api/recipes/by-ingredients/?ingredients=${ingredientIds}`
            const response = await api.get(query);
            onRecipesUpdate(response.data);
        } catch (error) {
            console.error("Error fetching recipes: ", error);
        }
    };


    return (

            <div className="SelectIngredients-content">
                <div className="ingredients-list">
                    <h2>Start Generating Recipes</h2>
                    <div className="ingredient-cards">
                        {ingredients.map((item, index) => (
                            <div className="ingredient-card" key={index}>
                                <span>{item.name}</span>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteIngredient(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ingredients-input">
                    <label htmlFor="ingredientDropdown">Ingredients</label>
                    <SearchableDropdown
                        searchPlaceholder="Enter Ingredient"
                        endpoint="ingredients"
                        value={selectedOption}
                        onSelect={setSelectedOption}

                    />
                    <div className="buttons">


                        <button id="searchButton" onClick={handleSearchRecipes}>
                            Search Recipes
                        </button>
                        <button id="addButton" onClick={handleAddIngredient}>
                            Add Ingredient
                        </button>
                    </div>
                </div>
            </div>

    );
}

export default SelectIngredients;
