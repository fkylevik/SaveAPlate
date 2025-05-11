import React, {useEffect, useState} from 'react';
import api from "../api";
import '../styles/RecipeCard.css';
import {useNavigate} from "react-router-dom"; // Import CSS file for styling
import defaultImage from "../assets/image.png";
import { Link } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.jsx";


const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate();
    const {isAuthorized}=useAuth();
    const [favoriteIds, setFavoriteIds]  =useState([]);

    useEffect(() => {
        if (isAuthorized){
            getFavoriteId();
        }
    }, [isAuthorized])

    const handleFavouriteRecipe = async () => {
        if(!isAuthorized){
            navigate("/login");
            return;
        }
        if (favoriteIds.includes(recipe.id)){
            try{
                const res = await api.get('/api/recipes/favorite/');
                const ids=res.data.find((fav)=>recipe.id === fav.recipe);
                await api.delete(`/api/recipes/favorite/${ids.id}/`);
                getFavoriteId();
            } catch (error){
                console.error('Error removing the recipe to favourites: ', error);
            }
        }
        else {
            try {
                await api.post('/api/recipes/favorite/', {recipe: recipe.id});
                    getFavoriteId();
            } catch (error) {
                console.error('Error adding the recipe to favourites: ', error);
            }
        }
    }

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

    const getFavoriteId = async()=>{
        try{
            const res = await api.get('/api/recipes/favorite/');
            const ids=res.data.map((fav)=>fav.recipe);
            setFavoriteIds(ids);
        }catch (error){
            console.log("Error fetching Favorite recipes in RecipeCard", error)
        }

    };

    return (


            <div className="card_content">
                <div className="card-header">
                    <div className="CarobRating">
                        <p>Carbon Rating : {CarbonScale(getCarbonFootPrintRating(Number(recipe.total_co2e)))}</p>
                    </div>
                    <button
                        className="favorite-button"
                        onClick={() => handleFavouriteRecipe()}
                        title={favoriteIds.includes(recipe.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                        {favoriteIds.includes(recipe.id) ? "❤️": "🤍"}
                    </button>
                 </div>
                    <hr style={{ width: "100%", textAlign: "left", marginLeft: 0,
                        marginTop: "0",marginBottom: "0.6rem",borderTop: "1px solid lightgray"
                        }} />


                <Link
                    to={`/recipes/${recipe.id}`}
                    className="recipe-card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                     >
                    <div className="recipe-image-container">
                            <img src={defaultImage} alt="Recipe" className="recipe-image"/>
                    </div>

                    <div className="recipe">

                        <h1 className="recipe-card-title">{recipe.name}</h1>

                        <div className="total_co2e">
                            <p>Carbon Footprint: {(recipe.total_co2e).toFixed(3)} CO<sub>2</sub>e (APS)</p>
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
