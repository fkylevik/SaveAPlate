import React, {useEffect, useState} from 'react';
import api from "../api";
import '../styles/RecipeCard.css';
import {useNavigate} from "react-router-dom"; // Import CSS file for styling
import defaultImage from "../assets/image.png";
import { Link } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.jsx";

const defaultServings = 4;


const RecipeCard = ({ recipe, refreshRecipes }) => {
    const [ingredients, setIngredients] = useState({})
    const navigate = useNavigate();
    const {isAuthorized}=useAuth();
    const [favoriteIds, setFavoriteIds]  =useState([]);

        // Correct image URL handling
    const imageUrl = recipe.image
        ? recipe.image.startsWith('http')
            ? recipe.image
            : `${api.defaults.baseURL}/media/recipes/${recipe.image.replace(/^recipes\//, '')}`
        : defaultImage;

    useEffect(() => {
        getIngredients();
    }, [])
    useEffect(() => {
        if (isAuthorized){
            getFavoriteId();
        }
    }, [isAuthorized])

    const handleDeleteRecipe = async () => {
        try {
            await api.delete(`/api/recipes/${recipe.id}/`);
            refreshRecipes();
        } catch (error) {
            console.error('Error deleting the recipe:', error);
        }
    }

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

            }catch (error){
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
    const getCarbonFootPrintRating = (footprint)=>{
        if(footprint<=0.5) {
            console.log(footprint);
            return 5;}
        else if (footprint<=1) return 4;
        else if (footprint<=1.5) return 3;
        else if (footprint<=2) return 2;
        else {
            console.log("returns ", footprint);
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
                            <img src={imageUrl} alt="Recipe" className="recipe-image"/>
                    </div>

                    <div className="recipe">

                        <h1 className="recipe-card-title">{recipe.name}</h1>

                        {/*<div className="recipe-meta">
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
                        </div>*/}

                        {/*<div className="instructions">
                            <h4>{recipe.instructions}</h4>
                        </div>*/}
                        <div className="total_co2e">
                            <p>Carbon Footprint: {(recipe.total_co2e).toFixed(3)} CO<sub>2</sub>e (APS)</p>
                        </div>
                        <div className="cookingTime">
                            <p>⏱️ Cooking time: {(recipe.cooking_time).toFixed(0)} minutes</p>
                        </div>


                        {/* <button
                            className="delete-button"
                            onClick={() => handleDeleteRecipe()}
                        >
                            &times;
                        </button>*/}

                    </div>
                </Link>
            </div>

    );
};

export default RecipeCard;
