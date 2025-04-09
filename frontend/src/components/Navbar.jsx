import React from "react";
import { useState } from "react"
import '../styles/Layout.css';
import {useNavigate} from "react-router-dom";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleMenuOnClick = (url) => {
        toggleMenu();
        navigate(url);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => {navigate("/")}}>
                SaveAPlate
            </div>
            <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
                <li onClick={() => {toggleMenuOnClick("/")}}>Home</li>
                <li onClick={() => {toggleMenuOnClick("/")}}>About</li>
                <li onClick={() => {toggleMenuOnClick("/")}}>Recipes</li>
                <li onClick={() => {toggleMenuOnClick("/")}}>Contact</li>
                <li onClick={() => {toggleMenuOnClick("/login")}}>Sign In</li>
            </ul>
            <button className="navbar-toggle" aria-label="Toggle menu" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
}

export default Navbar;