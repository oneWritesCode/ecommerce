import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {


  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">MyApp</div>
        <div className="space-x-4">
          {!user ? <span>

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

          </span>
            :
            <div>
              <h1>{user.name}</h1>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
