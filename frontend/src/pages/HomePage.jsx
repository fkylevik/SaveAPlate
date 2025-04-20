import CarbonFootprint from "../components/CarbonFootprint";
import SelectIngredients from "../components/SelectIngredients.jsx";
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
                   <button className="searchButton">Search</button>
                 </div>
           </div>

            <div>
                <SelectIngredients />
            </div>
            <div>
                <CarbonFootprint />
            </div>
            <footer className="footer">
                <p>© {new Date().getFullYear()} SaveAPlate. All rights reserved.</p>
            </footer>
        </>
    );
}

export default HomePage;