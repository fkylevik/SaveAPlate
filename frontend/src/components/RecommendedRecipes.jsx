import React from 'react';
import RecipeCard from './RecipeCard';
// import '../styles/RecommendedRecipes.css'; // Optional: your CSS for styling

// Temporary list of recommended recipes (dummy data)
const recommendedRecipes = [
  {
    name: "Vegetable Stir Fry",
    instructions: "15 mins",
    carbonFootprint: "Moderate",
    description: "A quick and easy vegetable stir-fry for a healthy dinner.",
  },
  {
    name: "Tomato Basil Pasta",
    instructions: "20 mins",
    carbonFootprint: "Low",
    description: "A delicious pasta dish that’s kinder to the environment.",
  },
  {
    name: "Berry Smoothie Bowl",
    instructions: "10 mins",
    carbonFootprint: "Low",
    description: "A refreshing smoothie bowl packed with antioxidants.",
  },
];

const RecommendedRecipes = () => {
  return (
    <div className="recommended-recipes-container">
      <h1>Recommended Recipes</h1>
      <p>Based on your ingredients</p>
      <button>View Recipes</button>
      <div className="recipe-card-grid">
        {recommendedRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedRecipes;
