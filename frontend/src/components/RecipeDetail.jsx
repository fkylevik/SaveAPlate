import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }   from 'react-router-dom';
import api                          from '../api';
import defaultImage                 from '../assets/image.png';
import TimerObject from "./TimerObject.jsx";
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

  useEffect(() => {
    api.get(`/api/recipes/${id}/`)
      .then(r => {
        setRecipe(r.data);
        setIsStarted(r.data.status === 'started');
        setIsFav(r.data.is_favorite || false);
      })
      .catch(e => {
        setError(
          e.response?.status === 404
            ? 'Recipe not found'
            : 'Error loading recipe'
        );
      });
  }, [id]);


  useEffect(() => {
    if (!recipe) return;
    (async () => {
      const map = {};
      for (const ri of recipe.recipe_ingredients) {
        const res = await api.get(`/api/ingredients/${ri.ingredient}/`);
        map[ri.ingredient] = res.data;
      }
      setIngredients(map);
    })();
  }, [recipe]);


  const handleStart = async () => {
    await api.post(`/api/recipes/${id}/start/`).catch(console.error);
    setIsStarted(true);
  };


  const toggleFav = async e => {
    e.stopPropagation();
    try {
      if (isFav) {
        await api.post(`/api/recipes/${id}/unfavorite/`);
      } else {
        await api.post(`/api/recipes/${id}/favorite/`);
      }
      setIsFav(f => !f);
    } catch (err) {
      console.error('Fav error', err);
    }
  };

//jj
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
                      {inst.timer ? inst.timer && <TimerObject instruction={inst} /> : null}
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
