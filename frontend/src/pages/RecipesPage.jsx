import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom"
import RecipeCard from "../components/RecipeCard.jsx";
//import "../styles/RecipesPage.css"


function RecipesPage () {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = async (e) => {
        await api
            .get("/api/recipes/")
            .then((res) => res.data)
            .then((data) => setRecipes(data))
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div>
                {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe}/>)}
            </div>
        </>
    );

}

export default RecipesPage;