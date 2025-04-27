import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }   from 'react-router-dom';
import api                          from '../api';
import defaultImage                 from '../assets/image.png';

export default function RecipeDetail() {

   const [recipe, setRecipe] = useState(null);
   const [image, setImage] = useState(null);
   const [error, setError] = useState('');
   const { id } = useParams();


   useEffect(() => {
        api.get(`/api/recipes/${id}/`)
          .then(r => setRecipe(r.data))
          .catch(e => {
            if (e.response?.status === 404) setError('Recipe not found');
            else                             setError('Error loading recipe');
      });
  }, [id]);

  if (error) return <div>{error}</div>
  if (!recipe) return <div>Loading...</div>


  return (
      <div>
          <h1>{recipe.name}</h1>
          <p>Cooking time: {recipe.cookingTime} min</p>
          <p> Carbon: {recipe.carbonFootprint} kgCO₂</p>
      </div>
  );
}