import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import FavoriteRecipePage from "./pages/FavoriteRecipePage.jsx";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}
//
function RegisterAndLogout() {
  localStorage.clear() // clear any old access tokens upon registering
  return <RegisterPage />
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/register" element={<RegisterAndLogout />}/>
          <Route path="/account" element={<AccountPage />}/>
          <Route path="/favorites" element={<FavoriteRecipePage />}/>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
