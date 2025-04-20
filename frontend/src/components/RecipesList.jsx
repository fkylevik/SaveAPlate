import { useState, useEffect } from "react";
import api from "../api.js";
import RecipeCard from "./RecipeCard.jsx";
import SelectIngredients from "./SelectIngredients.jsx";

function RecipesList () {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes();
    }, []);

    const handleRefreshRecipes = () => {
        getRecipes();
    }

    const getRecipes = async () => {
        try {
            const res = await api.get("/api/recipes/");
            setRecipes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRecipesUpdate = (filteredRecipes) => {
        setRecipes(filteredRecipes); // update recipes list with filtered data
    };

    return (
        <>
            <SelectIngredients onRecipesUpdate={handleRecipesUpdate} />
            <div>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} refreshRecipes={handleRefreshRecipes} />
                ))}
            </div>
        </>
    );
}

export default RecipesList;
