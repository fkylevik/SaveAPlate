import React from 'react';
import api from "../api";
// import '../styles/RecipeCard.css'; // Import CSS file for styling

const RecipeCard = ({ recipe }) => {

    return (
        <div className="recipe-card">
            <div id="recipe-card-header">
                <h2 className="recipe-card-title">{recipe.name}</h2>
                <h2 className="recipe-card-title">{recipe.instructions}</h2>
            </div>
            <p>{recipe.description}</p>
        </div>
    );
};

export default RecipeCard;
