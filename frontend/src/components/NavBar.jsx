import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">MyApp</div>
        <div className="space-x-4">
          <NavLink
            to="login"
            className={({ isActive }) => `
             ${isActive ? "" : ""}
               px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            `}
          >
            Login
          </NavLink>

          <NavLink
            to="sign-up"
            className={({ isActive }) => `
             ${isActive ? "" : ""}
               px-4 py-2 bg-gray-200 text-blue-600 rounded hover:bg-gray-300 transition"
            `}
          >
            Sign Up
          </NavLink> 
          <NavLink
            to="profile"
            className={({ isActive }) => `
             ${isActive ? "" : ""}
               px-4 py-2 bg-gray-200 text-blue-600 rounded hover:bg-gray-300 transition"
            `}
          >
            profile
          </NavLink>
          {/* <button className="">Sign In</button>
          <button className="px-4 py-2 bg-gray-200 text-blue-600 rounded hover:bg-gray-300 transition">
            Sign Up
          </button> */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
