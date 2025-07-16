import { ArrowBigRight, Pen, ShoppingCart, Eye, EyeOff, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import BackButton from "../components/BackButton";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  const getBackendUrl = () => import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
    console.log(userFromStorage);
  }, [id]);

  const handlePasswordSubmit = () => {
    if (password === product.sellerPassword) {
      setIsAuthenticated(true);
      setAuthError("");
      setShowAuthForm(false);
    } else {
      setAuthError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  async function addToCart() {
    if (!user) {
      setCartMessage("Please login first to add items to cart");
      return;
    }

    try {
      const cartData = {
        userName: user.name,
        userEmail: user.email, // User model doesn't have phone field
        productId: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productCategory: product.productCategory,
        productQuantity: product.productQuantity,
        productImages: product.productImages,
        sellerName: product.sellerName,
        sellerEmail: product.sellerEmail,
        sellerAddress: product.sellerAddress,
        sellerPhone: product.sellerPhone,
      };

      const response = await fetch(
        `${getBackendUrl()}/cart/addToCart/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCartMessage("Product added to cart successfully!");
        setTimeout(() => setCartMessage(""), 3000);
      } else {
        setCartMessage(data.error || "Failed to add to cart");
        setTimeout(() => setCartMessage(""), 3000);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      setCartMessage("Error adding to cart");
      setTimeout(() => setCartMessage(""), 3000);
    }
  }

  const maskSensitiveData = (data) => {
    if (!data) return "";
    const length = data.length;
    if (length <= 2) return "*".repeat(length);
    return data.charAt(0) + "*".repeat(length - 2) + data.charAt(length - 1);
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2)
      return "*".repeat(localPart.length) + "@" + domain;
    return (
      localPart.charAt(0) +
      "*".repeat(localPart.length - 2) +
      localPart.charAt(localPart.length - 1) +
      "@" +
      domain
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getBackendUrl()}/api/product/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[var(--light-color)] flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );

  return (
    <>
      <BackButton />

      <NavLink
        to={`/edit-product/${id}`}
        className="bg-[var(--dark-color)] py-2 px-4 flex items-center justify-between gap-2 rounded-2xl font-bold capitalize text-white fixed bottom-10 right-10"
      >
        edit
        <Pen size={18} />
      </NavLink>

      <div className="min-h-screen bg-[var(--light-color)] flex flex-col items-center p-4">
        <div className="bg-white/30 shadow-2xl rounded-t-2xl max-w-6xl w-full p-8 flex flex-col md:flex-row gap-8">
          {/* Images */}
          <div className="flex h-[60vh] flex-col items-center md:w-1/2 w-full">
            {product.productImages && product.productImages.length > 0 && (
              
              <img
                src={`${getBackendUrl()}${product.productImages[0]}`}
                alt={product.productName}
                className="h-full object-cover rounded-xl mb-4"
              />
            )}
            {product.productImages && product.productImages.length > 1 && (
              <div className="flex gap-2 flex-wrap justify-center">
                {product.productImages.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={`${getBackendUrl()}${img}`}
                    alt={product.productName + " " + idx}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
          {/* Details */}
          <div className="flex flex-col py-8 justify-between md:w-1/2 w-full">
            <h1 className="text-3xl font-bold mb-2 text-orange-600 uppercase">
              {product.productName}
            </h1>
            <p className="text-gray-700 text-base mb-4 capitalize">
              {product.productDescription}
            </p>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-2xl font-bold text-orange-600">
               $ {product.productPrice}
              </span>
              <span className="font-medium text-gray-700">
                {product.productQuantity > 0 ? (
                  `Qty : ${product.productQuantity}`
                ) : (
                  <span className="bg-[var(--dark-color)] font-bold py-1 px-2 rounded-2xl text-white">
                    sold out
                  </span>
                )}
              </span>
            </div>
            <div className="mb-4">
              <span className="text-xs text-gray-700">Category: </span>
              <span className="px-2 py-1 bg-[var(--light-color)] rounded-3xl text-xs">
                {product.productCategory}
              </span>
            </div>
            {/* Seller/Store Info */}
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-[var(--dark-color)]">
                Seller's Information :
              </div>
              <table className="w-full text-sm text-left text-gray-700 border border-[var(--light-color)] rounded-xl overflow-hidden">
                <tbody>
                  <tr className="">
                    <td className="font-medium py-1 w-1/3">Name</td>
                    <td className="py-1">{product.sellerName}</td>
                  </tr>
                  <tr className="">
                    <td className="font-medium py-1">Email</td>
                    <td className="py-1">{product.sellerEmail}</td>
                  </tr>
                  <tr className="">
                    <td className="font-medium py-1">Address</td>
                    <td className="py-1">{product.sellerAddress}</td>
                  </tr>
                  <tr className="">
                    <td className="font-medium py-1">Phone</td>
                    <td className="py-1">{product.sellerPhone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full">
              <button className="min-w-[300px] border-2 border-[var(--light-color)] rounded-sm overflow-hidden mt-auto">
                {product.productQuantity > 0 ? (
                  user ? (
                    <NavLink
                      to={`/buy-product/${product._id}`}
                      className="flex items-center justify-between text-[20px] text-white bg-[var(--dark-color)] hover:px-6 transition-all hover:bg-[var(--dark-color)]/80 text-medium capitalize text-2xl font-bold px-4 py-2 gap-2"
                    >
                      shop now
                      <ArrowBigRight />
                    </NavLink>
                  ) : (
                    <NavLink
                    to='/login'
                    className="flex items-center justify-between text-[20px] text-white bg-[var(--dark-color)] hover:px-6 transition-all hover:bg-[var(--dark-color)]/80 text-medium capitalize text-2xl font-bold px-4 py-2 gap-2"
                  >
                    login to shop
                    <User/>
                  </NavLink>
                  )
                ) : (
                  <div
                    className="flex items-center justify-between text-[20px] text-white bg-[var(--dark-color)] hover:px-6 transition-all hover:bg-[var(--dark-color)]/80 text-medium capitalize text-2xl font-bold px-4 py-2 gap-2"
                  >
                    out of stock
                  </div>
                )}
              </button>
              {product.productQuantity > 0 ? (
                <button
                  onClick={addToCart}
                  className="min-w-[300px] border-2 border-[var(--light-color)] rounded-sm overflow-hidden mt-auto flex items-center justify-between text-[20px] text-white bg-[var(--light-color)] hover:px-6 transition-all hover:bg-[var(--light-color)]/80 text-medium capitalize text-2xl font-bold px-4 py-2 gap-2"
                >
                  Add to cart
                  <ShoppingCart />
                </button>
              ) : (
                <span></span>
              )}
            </div>

            {/* Cart Message */}
            {cartMessage && (
              <div
                className={`mt-4 p-3 rounded-lg text-center font-medium ${
                  cartMessage.includes("successfully")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {cartMessage}
              </div>
            )}
          </div>
        </div>

        {/* password there and seller auth there */}

        {/* <div className="min-h-screen bg-[var(--light-color)] flex flex-col items-center p-4"> */}
        <div className="bg-white/30 shadow-2xl rounded-t-2xl max-w-7xl mt-20 w-full p-8 flex flex-col md:flex-row gap-8 items-center justify-center mb-10">
          {/* Buyers Information */}
          <div className="mb-4 w-full">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[var(--dark-color)]">
              <div className="font-semibold text-gray-700">
                Buyers Information (
                {product.buyersInformation
                  ? product.buyersInformation.length
                  : 0}{" "}
                purchases):
              </div>
              {!isAuthenticated ? (
                <button
                  onClick={() => setShowAuthForm(!showAuthForm)}
                  className="bg-[var(--dark-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--dark-color)]/80 transition-colors font-medium text-sm flex items-center gap-2"
                >
                  {showAuthForm ? "Hide" : "View Details"}
                  <Eye size={16} />
                </button>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white/90 px-2 py-1 rounded-lg text-green-800">
                    <span className="text-green-600 text-2xl">✓</span>
                    <span className="text-sm font-medium">
                      Authenticated as Seller
                    </span>
                    <button
                      onClick={() => {
                        setIsAuthenticated(false);
                        setShowAuthForm(false);
                        setPassword("");
                        setAuthError("");
                      }}
                      className="hover:text-green-900 text-sm underline rounded-2xl px-2 py-1 text-green-500"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Password Authentication Section */}
            {showAuthForm && !isAuthenticated && (
              <div className="p-6 rounded-xl mb-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    🔒 Seller Authentication Required
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enter seller password to view buyer details
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter seller password"
                      className="w-full px-4 py-2  bg-[var(--light-color)] text-white placeholder:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--dark-color)] focus:border-transparent"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handlePasswordSubmit()
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <button
                    onClick={handlePasswordSubmit}
                    className="bg-[var(--dark-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--dark-color)]/80 transition-colors font-medium"
                  >
                    Verify
                  </button>
                </div>

                {authError && (
                  <div className="text-center mt-3">
                    <p className="text-red-600 text-sm font-medium">
                      {authError}
                    </p>
                  </div>
                )}
              </div>
            )}
            {product.buyersInformation &&
            product.buyersInformation.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-700 border border-[var(--light-color)] rounded-xl overflow-hidden">
                  <thead className="bg-[var(--light-color)] text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Email</th>
                      <th className="px-3 py-2 text-left">Phone</th>
                      <th className="px-3 py-2 text-left">Status</th>
                      <th className="px-3 py-2 text-left">Qty</th>
                      <th className="px-3 py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.buyersInformation.map((buyer, index) => (
                      <tr
                        key={index}
                        className="border-b border-[var(--light-color)]/20"
                      >
                        <td className="px-3 py-2 font-medium">
                          {isAuthenticated
                            ? buyer.buyerName
                            : maskSensitiveData(buyer.buyerName)}
                        </td>
                        <td className="px-3 py-2">
                          {isAuthenticated
                            ? buyer.buyerEmail
                            : maskEmail(buyer.buyerEmail)}
                        </td>
                        <td className="px-3 py-2">
                          {isAuthenticated
                            ? buyer.buyerPhone
                            : maskSensitiveData(buyer.buyerPhone)}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              buyer.IsSold
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {buyer.IsSold ? "Delivered" : "Pending Delivery"}
                          </span>
                        </td>
                        <td className="px-3 py-2 font-bold text-orange-600">
                          {buyer.quantityPurchased}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {new Date(buyer.purchaseDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 font-medium capitalize text-xl text-red-600 rounded-lg">
                No purchases yet. Be the first to buy this product!
              </div>
            )}

            {/* Authentication Status */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default ProductDetail;
