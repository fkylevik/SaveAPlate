import RecipeCard from "./RecipeCard.jsx";
import SelectIngredients from "./SelectIngredients.jsx";

function RecipesList({ recipes, setRecipes, refreshRecipes }) {
    // callback to update recipes on ingredient filtering
    const handleRecipesUpdate = (filteredRecipes) => {
        setRecipes(filteredRecipes);
        console.log("API response:", response.data);

    };

    // Ensure recipes is always an array
    const recipeArray = Array.isArray(recipes) ? recipes : [];

    return (
        <>

            <SelectIngredients onRecipesUpdate={handleRecipesUpdate} />
            <div className="card-wrapper">
                {recipeArray.length > 0 ? (
                    recipeArray.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} refreshRecipes={refreshRecipes} />
                    ))
                ) : (
                    <p>No recipes available</p>
                )}
            </div>
        </>
    );
}

export default RecipesList;
