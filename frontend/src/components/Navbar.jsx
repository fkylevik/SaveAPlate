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

    return (
        <nav className="modern-navbar">
            <div className="navbar-logo" onClick={() => {navigate("/")}}>
                BrandName
            </div>
            <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
                <li onClick={() => {navigate("/")}}>Home</li>
                <li onClick={() => {navigate("/")}}>About</li>
                <li onClick={() => {navigate("/")}}>Recipes</li>
                <li onClick={() => {navigate("/")}}>Contact</li>
                <li onClick={() => {navigate("/login")}}>Sign In</li>
            </ul>
            <button className="navbar-toggle" aria-label="Toggle menu" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
}

export default Navbar;