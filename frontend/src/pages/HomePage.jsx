import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SaveAPlate</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                    {/* Example Search Form in Navbar */}
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search"
                               aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

function HomePage() {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");


    const handleAddIngredient = () => {
        if (newIngredient.trim() === "") return;
        setIngredients([...ingredients, newIngredient.trim()]);
        setNewIngredient("");  // Clear the input field
    };

    const handleGenerateRecipes = () => {
        console.log("Generate recipes with:", ingredients);
        alert(`Generating recipes with: ${ingredients.join(", ")}`);
    };

    const styles = {
        hero: {
            backgroundColor: '#6c9e75',  // Green hero section
            color: 'white',
            textAlign: 'center',
            padding: '60px 20px'
        },
        heroTitle: {
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '10px'
        },
        heroSubtitle: {
            fontSize: '1rem',
            marginBottom: '20px'
        },
        searchContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap'
        },
        searchInput: {
            padding: '10px',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '4px',
            width: '250px'
        },
        searchButton: {
            backgroundColor: '#3f5942',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer'
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div style={styles.hero}>
                <h1 style={styles.heroTitle}>Welcome to SaveAPlate</h1>
                <p style={styles.heroSubtitle}>Your smart recipe and sustainability assistant</p>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search for recipes"
                        style={styles.searchInput}
                    />
                    <button style={styles.searchButton}>Search</button>
                </div>
            </div>

            {/* Ingredients Section */}
            <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', alignItems: 'flex-start' }}>
                        {/* Left side: Ingredients List */}
                        <div style={{ flexBasis: '40%' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Enter Your Ingredients</h2>
                            <ul style={{ listStyleType: 'disc', paddingInlineStart: '20px', marginTop: '10px' }}>
                                {ingredients.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Right side: Input and Buttons */}
                        <div style={{ flexBasis: '40%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label htmlFor="ingredientInput" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Ingredients</label>
                            <input
                                id="ingredientInput"
                                type="text"
                                placeholder="Enter ingredient"
                                style={{ padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn btn-dark" onClick={handleAddIngredient}>Add</button>
                                <button className="btn btn-success" onClick={handleGenerateRecipes}>Generate Recipes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;