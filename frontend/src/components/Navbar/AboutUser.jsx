import { LogOut ,User } from "lucide-react"
import { useState } from "react";
import { NavLink } from "react-router-dom";


function AboutUser() {
  const [IsOPen, setIsOPen] = useState(false)

  const getBackendUrl = () => import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  function Logout() {

    fetch(`${getBackendUrl()}/user/logout`, {
      method: "POST",
      credentials: "include"
    })
      .then(res => {
        if (res.status === 200) {
          window.location.href = "/";
        } else {
          console.error("Logout failed");
        }
      })
      .catch(err => console.error("Error during logout:", err));
    localStorage.removeItem("user");
  }

  return (
    <div className="relative flex items-end justify-end flex-col">
      
      <div className="hover:bg-[var(--light-color)]/70 bg-[var(--light-color)]/50 rounded-full w-10 h-10 cursor-pointer flex items-center justify-center text-white"
        onClick={() => setIsOPen(prev => !prev)}>
        <User size={24} />
      </div>


      {IsOPen && (
        <NavLink
          className={({ isActive }) => `
            ${isActive ? "" : ""}
            flex items-center bg-white/20 py-2 px-4 rounded-xl text-white shadow-xs shadow-amber-700 justify-between gap-2 absolute top-12 left-0
          `}
          onClick={Logout}
        >
          <p className="pr-2">LogOut</p>
          <LogOut size={18} />
        </NavLink>
      )}
    </div>
  );
}

export default AboutUser; 