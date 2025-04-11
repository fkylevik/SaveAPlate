import 'bootstrap/dist/css/bootstrap.min.css';
import CarbonFootprint from "../components/CarbonFootprint";
import SelectIngredients from "../components/SelectIngredients.jsx";
import RecommendedRecipes from "../components/RecommendedRecipes.jsx";
import React from "react";
import '../styles/HomePage.css';


function HomePage() {
    return (
        <>
            <div className="hero">
                 <h1 className="heroTitle">Welcome to SaveAPlate</h1>
                 <p className="heroSubtitle">Your smart recipe and sustainability assistant</p>
                 <div className="searchContainer">
                   <input type="text" placeholder="Search for recipes" className="searchInput" />
                   <button className="searchButton btn-primary">Search</button>
                 </div>
           </div>

            <div>
                <SelectIngredients />
            </div>

            <div>
                <RecommendedRecipes />
            </div>

            <div>
                <CarbonFootprint />
            </div>
        </>
    );
}

export default HomePage;