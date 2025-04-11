import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import '../styles/HomePage.css';

function home() {
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
        </>
    );
}

export default HomePage;