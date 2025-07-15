import { ArrowRight } from 'lucide-react';
import Store from '../assets/images/Store.png';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AddProduct from '../components/AddProduct/AddProduct';

function LandingPage() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const getBackendUrl = () => import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${getBackendUrl()}/user/me`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (res.status === 200) return res.json();
        throw new Error("Not authenticated");
      })
      .then(data => {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch(() => {
        setUser(null)
        localStorage.removeItem("user");
      });
  }, []);



  return (
    <div className="pt-20 bg-[var(--light-color)] flex flex-col items-center justify-end">
      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-(100px+12vh))] flex-col items-center justify-center max-w-6xl w-full pl-12 pr-4 bg-white/30 rounded-t-4xl shadow-lg py-12">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {!user ? "Hello user," : `Hello ${user.name},`}
            </h1>
            <h6 className="text-lg text-gray-600">
              <span className="font-semibold text-lg">SHOPE</span> is now digital
            </h6>
            <p className="text-gray-500">
              Most trusted and valuable products at favourable prices. Search your required products and shop now.
            </p>
            <NavLink
              to="/products"
              className="inline-flex w-2/3 items-center px-6 py-2 bg-primary text-white rounded-lg shadow bg-[var(--dark-color)] whitespace-nowrap justify-between hover:bg-[var(--dark-color)]/80 hover:px-10 transition-all "
            >
              View Products
              <ArrowRight size={18} className="ml-2" />
            </NavLink>
          </div>
          <div className="md:w-2/3 w-full flex justify-center">
            <img
              src={Store}
              className="max-w-xs md:max-w-md w-full rounded-2xl"
            />
          </div>
        </div>
      </main>

{/* extra componenets */}
<AddProduct/>
    </div>
  )
}

export default LandingPage