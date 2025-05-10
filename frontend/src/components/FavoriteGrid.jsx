import React, {useEffect, useState} from 'react';
import RecipeCard from "./RecipeCard.jsx";
import api from "../api.js";
import "../styles/FavoriteGrid.css"

function FavoriteGrid() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async () => {
        try {
            const res = await api.get('/api/recipes/favorite/');
            const favoriteRecipes = await Promise.all(
                res.data.map(async (fav) => {
                    return await fetchRecipe(fav.recipe);
                })
            );
            setFavorites(favoriteRecipes);
        } catch (error) {
            console.error('Error fetching favorite recipes: ', error);
        }
    };

    const fetchRecipe = async (recipe_id) => {
        try {
            const res = await api.get(`/api/recipes/${recipe_id}/`);
            return res.data;
        } catch (error) {
            console.error('Error fetching recipe: ', error);
        }
    }

    return (
        <div className="favorite-page">
            <h2>Your Favorite Recipes!</h2>
            <div className="favorite-grid">
                {favorites.map((favorite) => (
                    <RecipeCard
                        key={favorite.id}
                        recipe={favorite}
                        refreshRecipes={getFavorites}
                    />
                ))}
            </div>
        </div>
    )
}

export default FavoriteGrid;