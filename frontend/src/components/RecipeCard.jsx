import React from 'react';
import '../styles/RecipeCard.css';
import defaultImage from "../assets/image.png";
import { Link } from 'react-router-dom';
import useFavoriteStatus from "../hooks/useFavoriteStatus.jsx";
import api from "../api.js";


const RecipeCard = ({ recipe }) => {
    const { isFav, toggleFavoriteStatus } = useFavoriteStatus(recipe.id)

    const imageUrl = recipe.image
    ? recipe.image.startsWith('http')
        ? recipe.image
        : `${api.defaults.baseURL}/media/recipes/${recipe.image.replace(/^recipes\//, '')}`
    : defaultImage;

    const getCarbonFootPrintRating = (footprint)=>{
        if(footprint<=0.5) {
            return 5;}
        else if (footprint<=1) return 4;
        else if (footprint<=1.5) return 3;
        else if (footprint<=2) return 2;
        else {
            return 1;
        }
    };

    const CarbonScale = (count) => {
        return "★".repeat(count)+"☆".repeat(5-count);
    };

    return (
        <div className="card_content">
            <div className="card-header">
                <div className="CarobRating">
                    <p>Carbon Rating : {CarbonScale(getCarbonFootPrintRating(Number(recipe.total_co2e)))}</p>
                </div>
                <input
                    className="favorite-button"
                    onClick={toggleFavoriteStatus}
                    type="button"
                    title={ isFav ? "Remove from favorites" : "Add to favorites"}
                    value={ isFav ? "❤️": "🤍"}
                />
            </div>
                <hr style={{ width: "100%", textAlign: "left", marginLeft: 0,
                    marginTop: "0", marginBottom: "0.6rem",borderTop: "1px solid lightgray"
                }}
                />


            <Link
                to={`/recipes/${recipe.id}`}
                className="recipe-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
                 >
                <div className="recipe-image-container">
                        <img src={imageUrl} alt="Recipe" className="recipe-image"/>
                </div>

                <div className="recipe">

                    <h1 className="recipe-card-title">{recipe.name}</h1>

                    <div className="total_co2e">
                        <p>Carbon Footprint: {(recipe.total_co2e).toFixed(3)} CO<sub>2</sub>e </p>
                    </div>
                    <div className="cookingTime">
                        <p>⏱️ Cooking time: {(recipe.cooking_time).toFixed(0)} minutes</p>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default RecipeCard;
