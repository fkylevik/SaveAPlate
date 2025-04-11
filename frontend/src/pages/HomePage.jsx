import React from "react";
import '../styles/HomePage.css';
import SearchableDropdown from "../components/SearchableDropdown.jsx";
import SelectIngredients from "../components/SelectIngredients.jsx";


function HomePage() {
    return (
        <>
            <div className="hero">
                 <h1 className="heroTitle">Welcome to SaveAPlate</h1>
                 <p className="heroSubtitle">Your smart recipe and sustainability assistant</p>
                 <div className="searchContainer">
                   <SearchableDropdown searchPlaceholder={"Search for recipes"} endpoint={"recipes"}/>
                   <button className="searchButton">Search</button>
                 </div>
            </div>
            <SelectIngredients></SelectIngredients>
        </>
    )
}

export default HomePage;