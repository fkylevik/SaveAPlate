import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
    const { isAuthorized, setIsAuthorized } = useAuth();

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthorized(false); // Update the `isAuthorized` state in your `useAuth` hook
        window.location.href = "/login" // Redirect to the homepage after logout
    };

    return (
        <div>
            <Navbar isLoggedIn={isAuthorized} onLogout={handleLogout} />
            <main>{children}</main>
        </div>
    );
}

export default Layout;
