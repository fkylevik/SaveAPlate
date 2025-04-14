import React from 'react';
import api from "../api";
import '../styles/RecipeCard.css'; // Import CSS file for styling

const RecipeCard = ({ recipe }) => {

    return (
        <div className="recipe-card">
            <div className="content">
                <div className="recipe">
                    <h1 className="recipe-card-title">{recipe.name}</h1>
                    <div className="ingredients">
                        {recipe.recipe_ingredients.map((item) => (
                            <div key={item} className="card">
                                <ul>{item.ingredient.name}: {item.amount} {item.unit} </ul>
                            </div>
                        ))}
                    </div>
                    <div className="instructions">
                        <h4>{recipe.instructions}</h4>
                    </div>
                </div>
        </div>
    );
};

export default RecipeCard;
