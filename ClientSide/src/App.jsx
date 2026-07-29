import { useState } from "react";
import "./App.css";
import Homepage from "./Pages/HomePage/Index";
import Register from "./Pages/LoginPage/Register.jsx";
import Login from "./Pages/LoginPage/Login.jsx";
import Product from "./Pages/WebApp/Product.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Pages/WebApp/Hero.jsx";
import { Calander } from "./Pages/WebApp/Calander.jsx";
import  MobileCalander  from "./Pages/WebApp/MobileCalander.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/app" element={<Product />}>
            <Route index element={<Hero />} />  {/*outlet in product*/}
            <Route path="habits" element={<Calander />} />
            <Route path="habits" element={<MobileCalander />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
