import { ArrowBigDown, Cross, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AddProduct() {
  const [showMessage, setShowMessage] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-10 right-10 z-40">
      {showMessage && (
        <div className=" fixed right-15 bottom-25 text-sm font-semibold animate-bounce flex items-end flex-col bg-[var(--dark-color)] rounded-lg p-2 text-white">
          Wanna sell your product? Here you go!
          <ArrowBigDown />
        </div>
      )}

      {user ? (
        <NavLink to="/add-product" className="fixed bottom-10 right-10">
          <div className="bg-[var(--dark-color)] p-4 rounded-full shadow-lg cursor-pointer hover:bg-[var(--light-color)] transition-all">
            <div className="text-white text-2xl w-5 h-5 flex items-center justify-center rounded-full">
              +
            </div>
          </div>
        </NavLink>
      ) : (
        <NavLink
          to={"/login"}
          className="fixed bottom-10 right-10">
          <div className="bg-[var(--dark-color)] p-4 rounded-full shadow-lg cursor-pointer hover:bg-[var(--light-color)] transition-all">
            <div className="text-white text-2xl w-5 h-5 flex items-center justify-center rounded-full">
              <User/>
            </div>
          </div>
        </NavLink>
      )}
    </div>
  );
}

export default AddProduct;
