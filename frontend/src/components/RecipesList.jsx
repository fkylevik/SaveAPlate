import RecipeCard from "./RecipeCard.jsx";
import "../styles/RecipeList.css";

function RecipesList({ recipes }) {

    const recipeArray = Array.isArray(recipes) ? recipes : [];

    return (
        <>
            <div className="recipeList-wrapper">
                <div className="recipeList-container">

                    {recipeArray.length > 0 ? (
                        recipeArray.map((recipe) => (
                        <div>
                                <RecipeCard key={recipe.id} recipe={recipe} />
                        </div>
                        ))
                    ) : (
                        <div className="no-results-container">
                        <h2 className="no-results-h2">Could not find any matching recipes</h2>
                            <p className="no-result-p">Please try removing some filters or making a new search</p>
                        </div>

                    )}
                </div>
            </div>
        </>
    );
}

export default RecipesList;
