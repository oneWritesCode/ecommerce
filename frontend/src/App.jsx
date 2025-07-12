import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ApiTest from "./pages/ApiTest";
import NavBar from "./components/Navbar/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddProductForm from "./pages/AddProductForm";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import EditProductPage from "./pages/EditProductPage";
import Footer from "./components/Footer";
// import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <AllProducts />
            </>
          }
        />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/apitest" element={<ApiTest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/edit-product/:id" element={<EditProductPage/>} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
