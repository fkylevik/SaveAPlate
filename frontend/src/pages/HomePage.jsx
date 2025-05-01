import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import RecipesList from "../components/RecipesList.jsx";
import CarbonFootprint from "../components/CarbonFootprint.jsx";

import api from "../api";

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState(""); // state for recipe query

    // fetch recipes on render, initially empty search query
    useEffect(() => {
        handleSearch();
    }, []);

    // update query on user input
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    // send request to API using query, update recipes state with response data
    const handleSearch = async () => {
        try {
            const res = await api.get(`/api/recipes/search/?search=${query}`);
            setRecipes(res.data);
        } catch (err) {
            console.error("Error searching recipes:", err);
        }
    };

    return (
        <>

            <div className="hero">
                <h1 className="heroTitle">Welcome to SaveAPlate</h1>
                <p className="heroSubtitle">Your smart recipe and sustainability assistant</p>
                <div className="searchContainer">
                    <input
                        type="text"
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="Search for recipe"
                        className="searchField"
                    />
                    <button className="searchButton btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>



            <RecipesList
                recipes={recipes}
                setRecipes={setRecipes}
                refreshRecipes={handleSearch}
            />


        </>
    );
}

export default HomePage;
