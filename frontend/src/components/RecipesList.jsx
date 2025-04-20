import RecipeCard from "./RecipeCard.jsx";
import SelectIngredients from "./SelectIngredients.jsx";

function RecipesList({ recipes, setRecipes, refreshRecipes }) {
    // callback to update recipes on ingredient filtering
    const handleRecipesUpdate = (filteredRecipes) => {
        setRecipes(filteredRecipes);
    };

    return (
        <>
            <SelectIngredients onRecipesUpdate={handleRecipesUpdate} />
            <div>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} refreshRecipes={refreshRecipes} />
                ))}
            </div>
        </>
    );
}

export default RecipesList;
