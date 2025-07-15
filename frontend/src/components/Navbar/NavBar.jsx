import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AboutUser from "./AboutUser";
import { LogOut, Menu, X } from "lucide-react";
import Cart from "./Cart";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[var(--light-color)] pt-6 flex items-center relative">
      <div className="max-w-4xl shadow-xl w-full mx-auto px-4 p-2 rounded-2xl flex justify-between items-center bg-[var(--dark-color)]">
        <div className="text-2xl font-bold text-white">Shope</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 capitalize font-bold">
          <NavLink
            to={`/`}
            className={({ isActive }) => ` 
            ${isActive ? "bg-white/20" : ""}
              px-4 py-2 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-all"
            `}
          >
            home
          </NavLink> 
          <NavLink
            to={`/products`}
            className={({ isActive }) => `
            ${isActive ? "bg-white/20" : ""}
              px-4 py-2 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-all"
            `}
          >
            product
          </NavLink> 
          
          {!user ? (
            <span className="flex items-center gap-4">
              <NavLink
                to="login"
                className={({ isActive }) => `
                ${isActive ? "" : ""}
                   bg-white/20 px-4 py-2 rounded-xl text-white shadow-xs shadow-amber-700 flex items-center justify-between gap-2"
                  `}
              >
                <p className="pr-2">login</p>
                <LogOut size={18} />
              </NavLink>

              <NavLink
                to="sign-up"
                className={({ isActive }) => `
                ${isActive ? "" : ""}
                   bg-white/20 px-4 py-2 rounded-xl text-white shadow-xs shadow-amber-700 flex items-center justify-between gap-2"
                  `}
              >
                Sign Up
              </NavLink>
            </span>
          ) : (
            <>
              <Cart />
              <AboutUser />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-orange-500 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={closeMobileMenu}
              className="text-white p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col space-y-4 p-4 capitalize font-bold">
            <NavLink
              to=""
              onClick={closeMobileMenu}
              className={({ isActive }) => ` 
              ${isActive ? "bg-white/20" : ""}
                px-4 py-3 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-all"
              `}
            >
              home
            </NavLink> 
            
            <NavLink
              to="products"
              onClick={closeMobileMenu}
              className={({ isActive }) => `
              ${isActive ? "bg-white/20" : ""}
                px-4 py-3 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-all"
              `}
            >
              product
            </NavLink> 
              
            {!user ? (
              <div className="flex flex-col space-y-4">
                <NavLink
                  to="login"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `
                  ${isActive ? "" : ""}
                     bg-white/20 px-4 py-3 rounded-xl text-white shadow-xs shadow-amber-700 flex items-center justify-between gap-2"
                    `}
                >
                  <p className="pr-2">login</p>
                  <LogOut size={18} />
                </NavLink>

                <NavLink
                  to="sign-up"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `
                  ${isActive ? "" : ""}
                     bg-white/20 px-4 py-3 rounded-xl text-white shadow-xs shadow-amber-700 flex items-center justify-between gap-2"
                    `}
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Cart />
                <AboutUser />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-white/10 backdrop-blur-sm transition-all bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}

export default NavBar;
