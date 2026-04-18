import { useState } from "react";
import "./App.css";
import Homepage from "./Pages/HomePage/Index";
import Register from "./Pages/LoginPage/Register.jsx";
import Login from "./Pages/LoginPage/Login.jsx";
import Product from "./Pages/WebApp/Product.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Pages/WebApp/Hero.jsx";
import { DesktopCalander } from "./Pages/WebApp/DesktopCalander.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/app" element={<Product />}>
            <Route index element={<Hero />} />
            <Route path="habits" element={<DesktopCalander />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
