import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import Footer from "./Footer.jsx";

function Layout({ children }) {
    const { isAuthorized, setIsAuthorized } = useAuth();

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthorized(false); // Update the `isAuthorized` state in your `useAuth` hook
        window.location.href = "/login" // Redirect to the login after logout
    };

    return (
        <div>
            <Navbar isLoggedIn={isAuthorized} onLogout={handleLogout} />
            <main className="page-container" >{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
