import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ApiTest from "./pages/ApiTest";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
    
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apitest" element={<ApiTest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
