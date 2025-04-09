import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import '../styles/HomePage.css';



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