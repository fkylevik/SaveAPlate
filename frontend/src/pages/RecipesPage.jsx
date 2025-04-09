import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom"
//import "../styles/RecipesPage.css"


function RecipesPage () {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = () => {
        api
            .get("/api/recipes/")
            .then((res) => res.data)
            .then((data) => setRecipes(data))
            .catch((err) => alert(err));

        console.log(recipes);
    };

    return (
        <>
        </>
    )
}

export default RecipesPage;