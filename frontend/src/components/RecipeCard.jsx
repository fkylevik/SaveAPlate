import React from 'react';
import api from "../api";
import '../styles/RecipeCard.css'; // Import CSS file for styling
import defaultImage from "../assets/image.png";

const RecipeCard = ({ recipe }) => {

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
                            <div key={item} className="card">
                                <ul>{item.ingredient.name}: {item.amount} {item.unit} </ul>
                            </div>
                        ))}

                    </div> */}

                    <div className="instructions">
                        <h4>{recipe.instructions}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
