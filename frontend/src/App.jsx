import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import RecipesList from "./components/RecipesList.jsx";
import SelectIngredients from "./components/SelectIngredients.jsx";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import FavoriteGrid from "./components/FavoriteGrid.jsx";
import About from "./components/About.jsx"

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
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesList />} />
            <Route path="/recipes/create" element={<CreateRecipePage />} />
            <Route path="/ingredients" element={<SelectIngredients />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/register" element={<RegisterAndLogout />}/>
            <Route path="/favorites" element={<FavoriteGrid />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="*" element={<h1>404 Not Found</h1>}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App;
