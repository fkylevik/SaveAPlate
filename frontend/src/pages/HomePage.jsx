import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

function home() {
     const styles = {
        hero: {
          backgroundColor: '#6c9e75',
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
             <div style={styles.hero}>
                     <h1 style={styles.heroTitle}>Welcome to SaveAPlate</h1>
                     <p style={styles.heroSubtitle}>Your smart recipe and sustainability assistant</p>
                     <div style={styles.searchContainer}>
                       <input type="text" placeholder="Search for recipes" style={styles.searchInput} />
                       <button style={styles.searchButton}>Search</button>
                     </div>
                   </div>

        </>

    )
}

export default home;