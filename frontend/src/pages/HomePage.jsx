import React, {useState, useEffect } from 'react';
import api from "../api.js";
import "../styles/HomePage.css";
import SearchableDropdown from "../components/SearchableDropdown.jsx";
import RecipesGrid from "../components/RecipesGrid.jsx";
import logo from "../assets/SaveAPlate.png";

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([])
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("")

    const buildUrl = (method, queryParams) => {
        const params = new URLSearchParams(queryParams);
        const sort=sortBy||"name";
        params.append('ordering', sort);
        return `/api/recipes/${method}/?${params.toString()}`;
    }

    const handleSearch = async (method, queryParams) => {
        try {
            const url = buildUrl(method, queryParams);
            const res = await api.get(url);
            setRecipes(res.data);
        } catch (err) {
            console.error("Error searching recipes:", err);
        }
    };

    const performSearchByName = async () => {
        await handleSearch("search", { search: query });
        setQuery("");
    };

    const performSearchByIngredient = async () => {
        const ingredientIds = ingredients.map((ing) => ing.id).join(",");
        await handleSearch("by-ingredients", { ingredients: ingredientIds});
    };

    const handleAddIngredient = async (ingredient) => {
        setIngredients([...ingredients, ingredient]);
    };

    const handleDeleteIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (ingredients.length > 0) {
            performSearchByIngredient();
        } else {
            performSearchByName();
        }
    }, [ingredients, sortBy]);

    useEffect(() => {}, [logo])

    return (
        <div>
            <div className="overlay">
                <img src={logo} className="logo"/>
            </div>

            <div className="hero">
                <h1 className="heroTitle">Welcome to SaveAPlate</h1>
                <p className="heroSubtitle">Your assistant for smart and sustainability meals</p>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search for recipe"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            performSearchByName(e); setIngredients([])
                        }
                      }}
                    className="searchField"
                />
                <button
                    className="searchButton btn-primary"
                    onClick={(e) => {performSearchByName(e); setIngredients([])}}
                >Search</button>
            </div>

            <div className="SelectIngredients-content">
                <div className="ingredients-list">
                    <h2>Search Recipes By Ingredients</h2>
                    <div className="ingredient-cards">
                        {ingredients.map((item, index) => (
                            <div className="ingredient-card" key={index}>
                                <span>{item.name}</span>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteIngredient(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ingredients-input">
                    <SearchableDropdown
                        isClearable
                        searchPlaceholder="Select an Ingredient"
                        endpoint="ingredients"
                        value={""}
                        onSelect={handleAddIngredient}
                    />
                </div>
            </div>

            <div className="search-results-header">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-by-select">
                    <option value="" disabled hidden> Sort by...</option>
                    <option value="name">Name Ascending</option>
                    <option value="-name">Name Descending</option>
                    <option value="cooking_time">Cooking Time Ascending</option>
                    <option value="-cooking_time">Cooking Time Descending</option>
                    <option value="total_co2e">Footprint Ascending</option>
                    <option value="-total_co2e">Footprint Descending</option>
                </select>
            </div>

            <RecipesGrid recipes={recipes}/>
        </div>
    )
}

export default HomePage;