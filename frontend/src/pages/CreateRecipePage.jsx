import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import RecipeIngredientItem from "../components/RecipeIngredientItem.jsx";
import SearchableDropdown from "../components/SearchableDropdown.jsx";

function CreateRecipePage() {
    const navigate = useNavigate();
    const [recipeName, setRecipeName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [servings, setServings] = useState(4);
    const [recipeIngredients, setRecipeIngredients] = useState([{
        ingredient: null,
        amount: "",
        unit: "",
    }]);

    const handleAddIngredient = () => {
        setRecipeIngredients([...recipeIngredients, {
            ingredient: null,
            amount: "",
            unit: "",
        }]);
    };

    const handleDeleteIngredient = (index) => {
        const newIngredients = recipeIngredients.filter((_, i) => i !== index);
        setRecipeIngredients(newIngredients);
    };

    const handleChangeIngredient = (index, field, value) => {
        const newIngredients = [...recipeIngredients];
        newIngredients[index][field] = value;
        setRecipeIngredients(newIngredients);
    };

    const handleCreateRecipe = async (e) => {
        e.preventDefault();
        const newRecipe = {
            name: recipeName,
            instructions: instructions,
            total_co2e: recipeIngredients.reduce((sum, ing) => sum + ing.ingredient['co2e_kg']*(ing.amount/1000), 0),
            recipe_ingredients: recipeIngredients.map((ingredient) => ({
                ingredient: ingredient.ingredient.id, // Updated to use `value`
                amount: ingredient.amount / servings,
                unit: ingredient.unit,
            }))
        };
        try {
            await api.post('api/recipes/', newRecipe);
            navigate("/");
        } catch (error) {
            console.error("There was an error creating the recipe!", error);
        }
    };

    return (
        <form onSubmit={handleCreateRecipe}>
            <div>
                <input
                    type="text"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    placeholder="Recipe name"
                    required
                />
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Recipe instructions"
                    required
                />
                <div>
                    <h2>Ingredients</h2>
                    <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        placeholder="Number of Servings"
                        required
                    />
                    {recipeIngredients.map((ingredient, index) => (
                        <RecipeIngredientItem
                            key={index}
                            index={index}
                            ingredient={ingredient}
                            onChange={(field, value) => handleChangeIngredient(index, field, value)}
                            onDelete={() => handleDeleteIngredient(index)}
                        />
                    ))}
                </div>
                <button className="searchButton" type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                <button className="btn-primary" type="submit">Create Recipe</button>
            </div>
        </form>
    );
}

export default CreateRecipePage;
