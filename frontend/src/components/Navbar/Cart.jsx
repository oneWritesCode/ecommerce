import { ShoppingCart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Cart() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const userData = JSON.parse(userFromStorage);
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user._id) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          `${getBackendUrl()}/cart/getCart/${user._id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCart(data.cart);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  if (!user) {
    return null; // Don't show cart if user is not logged in
  }

  // Calculate total items in cart
  const cartItemCount = cart && cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <NavLink
      to={`/cart/${user._id}`}
      className="relative flex items-end justify-end flex-col"
    >
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}

      <div className="hover:bg-[var(--light-color)]/70 bg-[var(--light-color)]/50 rounded-full w-10 h-10 cursor-pointer flex items-center justify-center text-white">
        <ShoppingCart size={24} />
      </div>
    </NavLink>
  );
}

export default Cart;
