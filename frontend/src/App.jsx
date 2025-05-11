import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import About from "./components/About.jsx"
import RecipeDetail from './pages/RecipeDetail.jsx';
import FavoritesPage from "./pages/FavoritesPage.jsx";

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />
}

function RegisterAndLogout() {
    localStorage.clear() // clear any old access tokens upon registering
    return <RegisterPage />
}

function App() {

    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/recipes/create" element={<ProtectedRoute><CreateRecipePage /></ProtectedRoute>} />
                        <Route path="/recipes/:id" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/logout" element={<Logout />}/>
                        <Route path="/register" element={<RegisterAndLogout />}/>
                        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
                        <Route path="/recipes/:id" element={ <RecipeDetail />}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}

export default App;
