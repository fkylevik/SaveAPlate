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
    }, [query]);

    // update query on user input
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    // send request to API using query, update recipes state with response data
    const handleSearch = async () => {
        try {
            const params = {
                search: query,
                ordering: '-name'
            };
            const res = await api.get("/api/recipes/search/", { params });
            console.log(res.data);
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSearch();
                            }
                          }}
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
//
}

export default HomePage;
