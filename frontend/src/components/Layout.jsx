import React from 'react';
import Navbar from './Navbar';
// import '../styles/Layout.css';

function Layout ({ children }) {
    return (
        <div className="page-container">
            <Navbar />
            <div className="page-content">
                {children}
            </div>
            <footer className="footer">
                <p>&copy; 2025 SaveAPlate. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Layout;