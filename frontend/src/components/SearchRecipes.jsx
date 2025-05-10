import React, {useState, useEffect } from 'react';
import api from "../api.js";
import "../styles/HomePage.css"
import SearchableDropdown from "./SearchableDropdown.jsx";
import RecipesList from "./RecipesList.jsx";

function SearchRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([])
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState('name')

    const buildUrl = (method, queryParams) => {
        const params = new URLSearchParams(queryParams);
        params.append('ordering', sortBy);
        return `/api/recipes/${method}/?${params.toString()}`;
    }

    const handleSearch = async (method, queryParams) => {
        try {
            const url = buildUrl(method, queryParams);
            const res = await api.get(url);
            console.log(res.data);
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


    return (
        <div>
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

            <div>
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
                <SearchableDropdown
                    isClearable
                    searchPlaceholder="Select an Ingredient"
                    endpoint="ingredients"
                    value={""}
                    onSelect={handleAddIngredient}
                />
            </div>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name Ascending</option>
                <option value="-name">Name Descending</option>
                <option value="cooking_time">Cooking Time Ascending</option>
                <option value="-cooking_time">Cooking Time Descending</option>
                <option value="total_co2e">Footprint Ascending</option>
                <option value="-total_co2e">Footprint Descending</option>
                <option value="cooking_time">Cooking Time Ascending</option>
                <option value="-cooking_time">Cooking Time Descending</option>
            </select>


            <RecipesList recipes={recipes}/>
        </div>
    )
}

export default SearchRecipes;