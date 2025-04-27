import React, {useEffect, useState} from 'react';
import api from "../api";
import '../styles/RecipeCard.css';
import {useNavigate} from "react-router-dom"; // Import CSS file for styling
import defaultImage from "../assets/image.png";
import { Link } from 'react-router-dom';

const defaultServings = 4;


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

        const handleFavouriteRecipe = async () => {
        try {
            await api.post('/api/recipes/favorite/', {recipe: recipe.id});
        } catch (error) {
            console.error('Error adding the recipe to favourites: ', error);
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
    <Link
        to={`/recipes/${recipe.id}`}
        className="recipe-card"
        style={{ textDecoration: 'none', color: 'inherit' }}
        >
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
                            Carbon Footprint: {recipe.carbonFootprint * defaultServings} kgCO<sub>2</sub>
                        </div>
                        )}
                    </div>

                    <button
                        className="delete-button"
                        onClick={() => handleDeleteRecipe()}
                    >
                        &times;
                    </button>
                    <button
                        className="favorite-button"
                        onClick={() => handleFavouriteRecipe()}
                    >
                        ❤️
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
