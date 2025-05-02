import RecipeCard from "./RecipeCard.jsx";
import SelectIngredients from "./SelectIngredients.jsx";
import "../styles/RecipeList.css";

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
            <div className="recipeList-wrapper">
                <div className="recipeList-container">

                    {recipeArray.length > 0 ? (
                        recipeArray.map((recipe) => (
                        <div>
                                <RecipeCard key={recipe.id} recipe={recipe} refreshRecipes={refreshRecipes} />
                        </div>
                        ))
                    ) : (
                        <div className="no-results-container">
                        <h2 className="no-results-h2">Could Not Find Recipes</h2>
                            <p className="no-result-p">Try searching for another recipe or delete your search</p>
                        </div>

                    )}
                </div>
            </div>
        </>
    );
}

export default RecipesList;
