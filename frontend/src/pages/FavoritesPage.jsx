import React, { useEffect, useState } from 'react';
import RecipesGrid from "../components/RecipesGrid.jsx";
import "../styles/FavoritesPage.css";
import api from "../api.js";

function FavoritesPage() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    const fetchFavorites = async () => {
        try {
            const res = await api.get('/api/recipes/favorite/');
            const tempFavorites = [];
            for ( const favorite of res.data ) {
                const recipe_res = await api.get(`/api/recipes/${favorite.recipe}/`);
                tempFavorites.push(recipe_res.data);
            }
            setFavoriteRecipes(tempFavorites);
        } catch (error) {
            console.error('Error fetching favorite recipes: ', error);
        }
    }

    useEffect(() => {
        fetchFavorites();
    }, [])

    return (
        <div className="favorite-page">
            <h2>Your Favorite Recipes!</h2>
            <RecipesGrid recipes={favoriteRecipes}/>
        </div>
    )
}

export default FavoritesPage;