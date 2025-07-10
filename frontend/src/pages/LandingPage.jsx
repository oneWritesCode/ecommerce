import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function LandingPage() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    fetch("http://localhost:8000/user/me", {
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
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center mt-20 px-4">
         {!user ?
            <h1>hello user</h1>
            :
            <h1>hello {user.name},</h1>
          }
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to MyApp</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
          Discover a modern platform to manage your tasks, collaborate with your team, and boost your productivity. Sign up now to get started!
        </p>
        <div className="space-x-4">

         
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition">Get Started</button>
          <button className="px-6 py-3 bg-gray-200 text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-300 transition">Learn More</button>
        </div>
      </main>






    </div>
  )
}

export default LandingPage