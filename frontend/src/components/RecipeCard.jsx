import api from "../api";
import '../styles/RecipeCard.css';
import defaultImage from "../assets/image.png";

const defaultServings = 4;


const RecipeCard = ({ recipe, refreshRecipes }) => {

    const handleDeleteRecipe = async () => {
        try {
            await api.delete(`/api/recipes/${recipe.id}/`);
            refreshRecipes();
        } catch (error) {
            console.error('Error deleting the recipe:', error);
        }
    }

    const handleFavouriteRecipe = async () => {
        try {
            await api.post('/api/recipes/favorite/', {recipe: recipe.id});
        } catch (error) {
            console.error('Error adding the recipe to favourites: ', error);
        }
    }

    return (
        <div className="recipe-card">
            <div className="content">
                <div className="recipe">
                    <div className="recipe-image-container">
                        <img src={defaultImage} alt="Recipe" className="recipe-image"/>
                    </div>
                    <h1 className="recipe-card-title">{recipe.name}</h1>

                    <div className="recipe-meta">
                        {recipe.cookingTime && (
                         <div className="cooking-time" >
                            Cooking Time: {recipe.cookingTime} minutes
                        </div>
                        )}
                        {recipe.carbonFootprint && (
                        <div className="carbon-footprint" >
                            Carbon Footprint: {recipe.carbonFootprint} kgCO<sub>2</sub>
                        </div>
                        )}
                    </div>

                    <div className="instructions">
                        <h4>{recipe.instructions}</h4>
                    </div>
                    <div className="total_co2e">
                        <h4>Carbon Footprint: {recipe.total_co2e * defaultServings} co2e</h4>
                    </div>

                    <button
                        className="delete-button"
                        onClick={() => handleDeleteRecipe()}
                    >
                        &times;
                    </button>
                    <button
                        className="favorite-button"
                        onClick={() => handleFavouriteRecipe()}
                    >
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
