import React, { useState } from "react";
import BackButton from "../components/BackButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(null);

  const getBackendUrl = () => import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }).then((res) => {
          if (res.status === 200) {
            window.location.href = "/";
            return res.json();
          }
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error);
      }
    };

    fetchData();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--light-color)] flex-col gap-8 p-4 relative">
      <div className="min-w-6xl absolute top-0 ">
        <BackButton />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 font-bold text-white py-2 rounded-xl hover:bg-orange-600 transition"
          >
          Login
        </button>
          {Error ? (
            <p className=" text-center text-red-600 my-2">
          InCorrect email or password
            </p>
          ) : " "}
      </form>


      <p className="mt-6 text-center ">
      
        Don't have an account?{" "}
        <a
          href="/signup"
          className="text-orange-600  text-sm font-semibold hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;
