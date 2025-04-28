import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }   from 'react-router-dom';
import api                          from '../api';
import defaultImage                 from '../assets/image.png';
import '../styles/variables.css';
import '../styles/RecipeDetail.css';

export default function RecipeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe]           = useState(null);
    const [ingredients, setIngredients] = useState({});
    const [error, setError]             = useState('');
    const [isStarted, setIsStarted]     = useState(false);
    const [servings, setServings]       = useState(4);
    const [isFav, setIsFav]             = useState(false);
    const [favId, setFavId] = useState(null);

    useEffect(() => {
        fetchRecipeDetails();
    }, [id]);


    useEffect(() => {
        if (!recipe) return;
        fetchRecipeIngredients(id);
    }, [recipe]);


    const fetchRecipeIngredients = async (id) => {
        const map = {};
        for (const ri of recipe.recipe_ingredients) {
            try {
                const res = await api.get(`/api/ingredients/${ri.ingredient}/`);
                map[ri.ingredient] = res.data;
            } catch (error) {
                console.error('Error fetching ingredient details: ', error);
            }
        }
        setIngredients(map);
    }


    const fetchRecipeDetails = async () => {
        try {
            const res = await api.get(`/api/recipes/${id}/`);
            const fav = await api.get(`/api/recipes/favorite/?recipe=${id}`);
            setRecipe(res.data);
            setIsStarted(res.data.status === 'started');
            if (fav.data.length > 0) {
                setFavId(fav.data[0].id);
                setIsFav(true);
            }
        } catch (error) {
            console.error('Error fetching recipe details: ', error);
        };
    }


    const handleStart = async () => {
        await api.post(`/api/recipes/${id}/start/`).catch(console.error);
        setIsStarted(true);
    };


    const toggleFav = async () => {
        try {
            if (isFav && favId !== null) {
                await api.delete(`/api/recipes/unfavorite/${favId}/`);
            } else if (!isFav){
                await api.post('/api/recipes/favorite/', {recipe: recipe.id});
            }
            setIsFav(!isFav);
        } catch (err) {
            console.error('Fav error', err);
        }
    };


    const increment = () => setServings(s => s + 1);
    const decrement = () => setServings(s => Math.max(1, s - 1));

    if (error)   return <div className="errorBanner">{error}</div>;
    if (!recipe) return <div className="loading">Loading…</div>;

    return (
        <div className="detailPage">
            {/* ← Back */}
            <button className="backButton" onClick={() => navigate(-1)}>
                ← Back
            </button>

            {/* HERO: Image + Info */}
            <div className="detailHero">
                <div className="heroImageWrapper">
                    <img
                        src={recipe.imageUrl || defaultImage}
                        alt={recipe.name}
                        className="detailImage"
                    />
                    <button
                        className={`favoriteButton ${isFav ? 'fav-on' : ''}`}
                        onClick={toggleFav}
                        title={isFav ? 'Unfavorite' : 'Favorite'}
                    >
                        ♥
                    </button>
                </div>
                <div className="detailInfo">
                    <div className="detailHeader">
                        <h1 className="detailTitle">{recipe.name}</h1>
                        <div className="servingsControl">
                            <button
                                className="servingsBtn"
                                onClick={decrement}
                                disabled={servings <= 1}
                            >–</button>
                            <span className="servingsDisplay">{servings}</span>
                            <button
                                className="servingsBtn"
                                onClick={increment}
                            >+</button>
                        </div>
                    </div>
                    <p className="detailMeta">
                        Cooking time: {recipe.cookingTime} min
                    </p>
                    {recipe.carbonFootprint != null && (
                        <p className="detailMeta">
                            Carbon: {(recipe.carbonFootprint * servings).toFixed(2)} kg CO<sub>2</sub>
                        </p>
                    )}
                    {recipe.total_co2e != null && (
                        <p className="detailMeta">
                            Total CO<sub>2</sub>e: {(recipe.total_co2e * servings).toFixed(2)} kg CO<sub>2</sub>e
                        </p>
                    )}
                </div>
            </div>

            {/* TWO-COLUMN: Ingredients & Instructions */}
            <div className="detailSections">
                {/* Ingredients */}
                <section className="ingredientsSection">
                    <h2 className="sectionHeading">
                        Ingredients — Servings: {servings}
                    </h2>
                    <ul className="ingredientsList">
                        {recipe.recipe_ingredients.map((ri, idx) => {
                            const ing = ingredients[ri.ingredient];
                            const amt = (ri.amount * servings).toFixed(2);
                            return (
                                <li key={idx} className="ingredientItem">
                                    {amt} {ri.unit} {ing?.name || '…'}
                                </li>
                            );
                        })}
                    </ul>
                </section>

                {/* Instructions */}
                <section className="instructionsSection">
                    <h2 className="sectionHeading">Instructions</h2>
                    <ul className="instructionsList">
                        {recipe.recipe_instructions
                            .sort((a, b) => a.step - b.step)
                            .map(inst => (
                                <li key={inst.step} className="instructionItem">
                                    <input
                                        type="checkbox"
                                        id={`inst-${inst.step}`}
                                        className="instructionCheckbox"
                                    />
                                    <label
                                        htmlFor={`inst-${inst.step}`}
                                        className="instructionLabel"
                                    >
                                        {inst.instruction}
                                    </label>
                                </li>
                            ))}
                    </ul>
                </section>
            </div>

            {/* Start Cooking Button */}
            <div className="startButtonWrapper">
                <button
                    className="startButton"
                    onClick={handleStart}
                    disabled={isStarted}
                >
                    {isStarted ? 'In Progress' : 'Start Cooking'}
                </button>
            </div>
        </div>
    );
}
