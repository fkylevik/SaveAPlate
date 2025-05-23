import React, {useEffect} from "react";
import { useState } from "react"
import '../styles/Layout.css';
import {useNavigate} from "react-router-dom";
import logo_nobg from "../assets/logo_nobg.png";

function Navbar({ isLoggedIn, onLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleMenuOnClick = (url) => {
        toggleMenu();
        navigate(url);
    };

    useEffect(() => {}, [logo_nobg])

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => {navigate("/")}} title= "Go to Home Page">
                SaveAPlate
            </div>
            <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
                <li onClick={() => {toggleMenuOnClick("/")}}>Home</li>

                {isLoggedIn ? ( // if logged in, also display these navbar elements
                    <>
                        <li onClick={() => {toggleMenuOnClick("/dashboard")}}>Dashboard</li>
                        <li onClick={() => {toggleMenuOnClick("/favorites")}}>Favorites</li>
                        <li onClick={() => {toggleMenuOnClick("/recipes/create")}}>Create a recipe</li>
                        <li onClick={onLogout}>Logout</li>
                    </>
                ) : ( // if not logged in, display these navbar elements
                    <>
                        <li onClick={() => {toggleMenuOnClick("/login")}}>Sign In</li>
                        <li onClick={() => {toggleMenuOnClick("/register")}}>Register</li>
                    </>
                )}
            </ul>
            <button className="navbar-toggle" aria-label="Toggle menu" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
}

export default Navbar;