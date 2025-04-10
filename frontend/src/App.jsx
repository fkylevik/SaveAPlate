import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import SelectIngredients from "./components/SelectIngredients.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";

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
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/create" element={<CreateRecipe />} />
            <Route path="/ingredients" element={<SelectIngredients />} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/register" element={<RegisterAndLogout />}/>
            <Route path="*" element={<h1>404 Not Found</h1>}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App;
