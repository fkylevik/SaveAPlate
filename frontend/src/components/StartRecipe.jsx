import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/RecipeDetail.css';
import defaultImage from '../assets/image.png';
import TimerObject from "./TimerObject.jsx";

function StartRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState({});
    const [isStarted, setIsStarted] = useState(false);
    const [servings, setServings] = useState(4);
    const [isFav, setIsFav] = useState(false);

    const fetchRecipeDetails = async () => {
        try {
            const res1 = await api.get(`/api/recipes/${id}/`);
            setRecipe(res1.data);
            for ( const ing of res1.data.recipe_ingredients ) {
                const res2 = await api.get(`/api/ingredients/${ing.ingredient}/`)
                setIngredients((prevIngredients) => ({
                    ...prevIngredients,
                    [ing.ingredient]: res2.data
                }));
            }
            await favoriteStatus(id);
        } catch (error) {
            console.error('Error fetching recipe: ', error);
        }
    };

    const favoriteStatus = async (recipe_id, toggle=false) => {
        try {
            if (!toggle) {
                const res = await api.get(`/api/recipes/favorites/${recipe_id}/`);
                setIsFav(res.data.isFavorited);
            } else {
                isFav ? api.delete(`/api/recipes/favorite/${id}/`) : api.post(`/api/recipes/favorite/`, {recipe: id});
            }
        }catch (error) {
            console.error('Error fetching favorite recipe status: ', error);
        }
    };

    useEffect(() => {
        fetchRecipeDetails();
    }, [id, isFav])

    const completeRecipe = async () => {
        try {
            await api.post("/api/recipes/complete/", { recipe: id, co2e: recipe.total_co2e * servings});
        } catch (error) {
            console.error('Error completing recipe: ', error);
        }
    };

    const handleStartRecipe = () => {
        if (isStarted) {completeRecipe();}
        setIsStarted(!isStarted);
    };

    return (
        <div className="detailPage">
            <button className="backButton" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="detailHero">
                <div className="heroImageWrapper">
                    <img
                        src={recipe.imageUrl || defaultImage}
                        className="detailImage"
                    />
                    <input
                        className={`favoriteButton ${isFav ? 'fav-on' : ''}`}
                        type="button"
                        onClick={() => favoriteStatus(id, true)}
                        title={isFav ? "Remove from favorites" : "Add to favorites"}
                        value={isFav ? "❤️": "🤍"}
                    />
                </div>

                <div className="detailInfo">
                    <div className="detailHeader">
                        <h1 className="detailTitle">{recipe.name}</h1>
                    </div>
                    <div className="servingsControl">
                        <input
                            className="servingsBtn"
                            type="button"
                            value="-"
                            disabled={servings <= 1}
                            onClick={() => setServings(s => Math.max(1, s - 1))}
                        />
                        <span className="servingsDisplay">{servings}</span>
                        <input
                            className="servingsBtn"
                            type="button"
                            value="+"
                            disabled={servings >= 16}
                            onClick={() => setServings(s => Math.min(16,s + 1))}
                        />
                    </div>

                    <p className="detailMeta">Cooking Time: {recipe.cooking_time} min</p>
                    <p className="detailMeta">Carbon Footprint: {(recipe.total_co2e * servings).toFixed(2)} kg CO<sub>2</sub></p>
                </div>
            </div>

            <div className="detailSections">
                <section className="ingredientsSection">
                    <h2 className="sectionHeading">Ingredients</h2>
                    <ul className="ingredientsList">
                        {recipe.recipe_ingredients?.map((recipeIngredient, idx) => {
                            const ingredient = ingredients[recipeIngredient.ingredient];
                            const amt = (recipeIngredient.amount * servings).toFixed(2);
                            return(
                                <li key={idx} className="ingredientItem">
                                    { isStarted ?
                                        <input
                                            type="checkbox"
                                            id={`ing-${idx}`}
                                            className="instructionCheckbox"
                                        /> : null
                                    }
                                    {amt} {recipeIngredient.unit} {ingredient?.name}
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <section className="instructionsSection">
                    <h2 className="sectionHeading">Instructions</h2>
                    <ul className="instructionsList">
                        {recipe.recipe_instructions?.map((recipeInstruction, idx) => {
                            return(
                                <li key={idx} className="instructionItem">
                                    { isStarted ?
                                        <input
                                            type="checkbox"
                                            id={`inst-${idx}`}
                                            className="instructionCheckbox"
                                        /> : null
                                    }
                                    <span>{recipeInstruction.step}. {recipeInstruction.instruction}</span>
                                    {recipeInstruction.timer ? <TimerObject instruction={recipeInstruction} /> : null}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>

            <div className="startButtonWrapper">
                <input
                    className="startButton"
                    type="button"
                    onClick={handleStartRecipe}
                    value={isStarted ? "Complete Recipe" : "Start Cooking"}
                />
            </div>

        </div>
    )
}

export default StartRecipe;