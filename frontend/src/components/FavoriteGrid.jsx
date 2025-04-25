import React, {useEffect, useState} from 'react';
import RecipeCard from "./RecipeCard.jsx";
import api from "../api.js";


function FavoriteGrid() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async () => {
        try {
            const res = await api.get('/api/recipes/favorite/');
            setFavorites(res.data);
        } catch (error) {
            console.error('Error fetching favorite recipes: ', error);
        }
    }

    return (
        <div className="favorite-grid">
            {favorites.map((favorite) => (
                <RecipeCard
                    key={favorite.id}
                    recipe={favorite}
                    refreshRecipes={getFavorites}
                />
            ))}
        </div>
    )
}

export default FavoriteGrid;