import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }   from 'react-router-dom';
import api                          from '../api';
import defaultImage                 from '../assets/image.png';
import '../styles/variables.css';
import '../styles/RecipeDetail.css';

const defaultServings = 4;

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState({});
  const [error, setError] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  // Fetch recipe
  useEffect(() => {
    api.get(`/api/recipes/${id}/`)
      .then(r => {
        setRecipe(r.data);
        setIsStarted(r.data.status === 'started');
      })
      .catch(e => {
        setError(
          e.response?.status === 404
            ? 'Recipe not found'
            : 'Error loading recipe'
        );
      });
  }, [id]);

  // Fetch ingredient details
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

  // Start cooking handler
  const handleStart = async () => {
    try {
      await api.post(`/api/recipes/${id}/start/`);
    } catch (e) {
      console.error('Error starting recipe:', e);
    }
    setIsStarted(true);
  };

  if (error)   return <div className="errorBanner">{error}</div>;
  if (!recipe) return <div className="loading">Loading…</div>;

  return (
    <div className="detailPage">
      {/* Back Button */}
      <button
        className="backButton"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Hero: Image + Meta */}
      <div className="detailHero">
        <img
          src={recipe.imageUrl || defaultImage}
          alt={recipe.name}
          className="detailImage"
        />
        <div className="detailInfo">
          <h1 className="detailTitle">{recipe.name}</h1>
          <p className="detailMeta">
            Cooking time: {recipe.cookingTime} min
          </p>
          {recipe.carbonFootprint != null && (
            <p className="detailMeta">
              Carbon: {(recipe.carbonFootprint * defaultServings).toFixed(2)} kg CO<sub>2</sub>
            </p>
          )}
          {recipe.total_co2e != null && (
            <p className="detailMeta">
              Total CO<sub>2</sub>e: {(recipe.total_co2e * defaultServings).toFixed(2)} kg CO<sub>2</sub>e
            </p>
          )}
        </div>
      </div>

      {/* Two-column: Ingredients & Instructions */}
      <div className="detailSections">
        <section className="ingredientsSection">
          <h2 className="sectionHeading">Ingredients</h2>
          <ul className="ingredientsList">
            {recipe.recipe_ingredients.map((ri, idx) => {
              const ing = ingredients[ri.ingredient];
              return (
                <li key={idx} className="ingredientItem">
                  {ing?.name || '…'}: {ri.amount} {ri.unit}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="instructionsSection">
          <h2 className="sectionHeading">Instructions</h2>
          <ol className="instructionsList">
            {recipe.recipe_instructions
              .sort((a, b) => a.step - b.step)
              .map(inst => (
                <li key={inst.step} className="instructionItem">
                  {inst.instruction}
                </li>
              ))}
          </ol>
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
