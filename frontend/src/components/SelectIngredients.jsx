import "../styles/SelectIngredients.css";
import { useState } from "react";

function SelectIngredients() {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");

    const handleAddIngredient = () => {
        if (newIngredient === "") return;
        setIngredients([...ingredients, newIngredient]);
        setNewIngredient(""); // Clear the input field
    };

    const handleDeleteIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleGenerateRecipes = () => {
        console.log("Generate recipes with:", ingredients);
        alert(`Generating recipes with: ${ingredients.join(", ")}`);
    };

    return (
        <div className="container">
            <div className="content">
                <div className="ingredients-list">
                    <h2>Enter Your Ingredients</h2>
                    <div className="ingredient-cards">
                        {ingredients.map((item, index) => (
                            <div className="ingredient-card" key={index}>
                                <span>{item}</span>
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
                    <label htmlFor="ingredientInput">Ingredients</label>
                    <input
                        id="ingredientInput"
                        type="text"
                        placeholder="Enter ingredient"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />
                    <div className="buttons">
                        <button id="addButton" onClick={handleAddIngredient}>
                            Add
                        </button>
                        <button
                            id="generateButton"
                            onClick={handleGenerateRecipes}
                        >
                            Generate Recipes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectIngredients;
