import api from "../api.js";
import React, { useEffect, useState } from "react";

function FavoriteStatus (recipe_id) {
    const [isFav, setIsFav] = useState(false);

    const checkFavoriteStatus = async () => {
        try {
            const res = await api.get(`/api/recipes/favorites/${recipe_id}/`);
            setIsFav(res.data.isFavorited);
        } catch (error) {
            console.error('Error fetching favorite recipe status: ', error);
        }
    }

    useEffect(() => {
        checkFavoriteStatus();
    }, [recipe_id]);

    const toggleFavoriteStatus = async () => {
        try {
            if (isFav) {
                await api.delete(`/api/recipes/favorite/${recipe_id}/`);
            } else {
                await api.post(`/api/recipes/favorite/`, {recipe: recipe_id});
            }
            setIsFav((prev) => !prev);
        } catch (error) {
            console.error('Error toggling favorite recipe status: ', error);
        }

    }

    return { isFav, toggleFavoriteStatus };
}

export default FavoriteStatus;