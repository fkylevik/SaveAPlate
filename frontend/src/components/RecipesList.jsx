import RecipeCard from "./RecipeCard.jsx";
import SelectIngredients from "./SelectIngredients.jsx";
import "../styles/RecipeList.css";

function RecipesList({ recipes, setRecipes, refreshRecipes }) {
    // callback to update recipes on ingredient filtering
    const handleRecipesUpdate = (filteredRecipes) => {
        setRecipes(filteredRecipes);
    };

    // Ensure recipes is always an array
    const recipeArray = Array.isArray(recipes) ? recipes : [];

    return (
        <>
            <SelectIngredients onRecipesUpdate={handleRecipesUpdate} />
            <div className="recipeList-container">
                {recipeArray.length > 0 ? (
                    recipeArray.map((recipe) => (
                    <div>
                            <RecipeCard key={recipe.id} recipe={recipe} refreshRecipes={refreshRecipes} />
                    </div>
                    ))
                ) : (
                    <p>No recipes available</p>
                )}
            </div>
        </>
    );
}

export default RecipesList;
