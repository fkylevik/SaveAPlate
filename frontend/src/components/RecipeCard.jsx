import React, {useEffect, useState} from 'react';
import api from "../api";
import '../styles/RecipeCard.css';
import {useNavigate} from "react-router-dom"; // Import CSS file for styling
import defaultImage from "../assets/image.png";


const RecipeCard = ({ recipe, refreshRecipes }) => {
    const [ingredients, setIngredients] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        getIngredients();
    }, [])

    const handleDeleteRecipe = async () => {
        try {
            await api.delete(`/api/recipes/${recipe.id}/`);
            refreshRecipes();
        } catch (error) {
            console.error('Error deleting the recipe:', error);
        }
    }

    const getIngredients = async () => {
        try {
            const ingredientsData = {};
            for (let i = 0; i < recipe.recipe_ingredients.length; i++) {
                const ingredient_id = recipe.recipe_ingredients[i]['ingredient'];
                const res = await api.get(`/api/ingredients/${ingredient_id}/`);
                ingredientsData[ingredient_id] = res.data;
            }
            setIngredients(ingredientsData);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="recipe-card">
            <div className="content">
                <div className="recipe">
                    <div className="recipe-image-container">
                        <img src={defaultImage} alt="Recipe" className="recipe-image"/>
                    </div>
                    <h1 className="recipe-card-title">{recipe.name}</h1>

                    <div className="recipe-meta">
                        {recipe.cookingTime && (
                         <div className="cooking-time" >
                            Cooking Time: {recipe.cookingTime} minutes
                        </div>
                        )}
                        {recipe.carbonFootprint && (
                        <div className="carbon-footprint" >
                            Carbon Footprint: {recipe.carbonFootprint} kgCO<sub>2</sub>
                        </div>
                        )}
                    </div>

                    {/*}<div className="ingredients">
                        {recipe.recipe_ingredients.map((item) => (
                            <div key={item.id} className="card">
                                <ul>{ingredients[item.ingredient]?.name || 'Loading'}: {item.amount} {item.unit} </ul>
                            </div>
                        ))}

                    </div> */}

                    <div className="instructions">
                        <h4>{recipe.instructions}</h4>
                    </div>
                    <div className="total_co2e">
                        <h4>Carbon Footprint: {recipe.total_co2e} co2e</h4>
                    </div>

                    <button
                        className="delete-button"
                        onClick={() => handleDeleteRecipe()}
                    >
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
