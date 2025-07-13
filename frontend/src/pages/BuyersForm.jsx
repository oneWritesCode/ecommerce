import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function BuyersForm() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canPurchase, setCanPurchase] = useState(true);
  const navigate = useNavigate();

  // Buyer form state
  const [buyerForm, setBuyerForm] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerAddress: "",
    buyerPhone: "",
    quantityPurchased: 1,
  });

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/product/${id}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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

  // Check quantity validity whenever quantity or product changes
  useEffect(() => {
    if (product) {
      setCanPurchase(isQuantityValid());
    }
  }, [buyerForm.quantityPurchased, product]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setBuyerForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle quantity changes
  function handleQuantityChange(newQuantity) {
    if (newQuantity >= 1 && newQuantity <= product.productQuantity) {
      setBuyerForm((prev) => ({ ...prev, quantityPurchased: newQuantity }));
    }
  }

  // Check if quantity is valid
  function isQuantityValid() {
    if (!product) return false;
    return buyerForm.quantityPurchased >= 1 && 
           buyerForm.quantityPurchased <= product.productQuantity;
  }

  function incrementQuantity() {
    handleQuantityChange(buyerForm.quantityPurchased + 1);
  }

  function decrementQuantity() {
    handleQuantityChange(buyerForm.quantityPurchased - 1);
  }

  // Handle purchase submission
  async function handleSubmit(event) {
    event.preventDefault();
    
    // Double-check quantity validity before submitting
    if (!isQuantityValid()) {
      alert("Invalid quantity. Please check the available stock.");
      return;
    }
    
    try {
      const response = await fetch(
        `http://localhost:8000/api/buy-product/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buyerForm),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Purchase successful! Thank you for your order.");
        navigate(`/product/${id}`);
      } else {
        alert(data.message || "Failed to purchase product");
      }
    } catch (error) {
      alert("Error purchasing product: " + error.message);
    }
  }

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
      <div className="min-h-screen bg-[var(--light-color)] p-8 pb-30">
        <div className="max-w-6xl mx-auto">
          {/* Product Details Section */}
          <div className="bg-white/30 rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-orange-600">
              Product Details
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="flex justify-center">
                {product.productImages && product.productImages.length > 0 && (
                  <img
                    src={`http://localhost:8000${product.productImages[0]}`}
                    alt={product.productName}
                    className="w-64 h-64 object-contain rounded-lg"
                  />
                )}
              </div>
              {/* Product Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {product.productName}
                </h2>
                <p className="text-gray-600">{product.productDescription}</p>
                <div className="flex items-center gap-4 justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{product.productPrice}
                  </span>
                  <span className="text-sm text-gray-900">
                    Available: {product.productQuantity} Qty
                  </span>
                </div>
                <div className="text-sm text-gray-900 flex flex-col justify-center gap-2">
                  <p>
                    <strong>Category : </strong>{" "}
                    <span className="bg-[var(--light-color)] px-2 py-1 rounded-2xl text-white font-bold ">
                      {product.productCategory}
                    </span>
                  </p>
                  <p>
                    <strong>Seller : </strong> {product.sellerName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Form Section */}
          <div className="bg-white/30 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-center text-orange-600">
              Buyer Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="buyerName"
                  >
                    Full Name
                  </label>
                  <input
                    id="buyerName"
                    name="buyerName"
                    type="text"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                    value={buyerForm.buyerName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="buyerEmail"
                  >
                    Email
                  </label>
                  <input
                    id="buyerEmail"
                    name="buyerEmail"
                    type="email"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                    value={buyerForm.buyerEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="buyerPhone"
                  >
                    Phone Number
                  </label>
                  <input
                    id="buyerPhone"
                    name="buyerPhone"
                    type="tel"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                    value={buyerForm.buyerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="quantityPurchased"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center  rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      disabled={buyerForm.quantityPurchased <= 1}
                      className="px-4 py-2 bg-[var(--light-color)] font-bold disabled:opacity-50 borde rounded-full disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      id="quantityPurchased"
                      name="quantityPurchased"
                      type="number"
                      min="1"
                      max={product.productQuantity}
                      className=" px-6 py-2 text-center outline-none"
                      value={buyerForm.quantityPurchased}
                      onChange={handleChange}
                      // disabled 
                      required
                    />
                    <button
                      type="button"
                      onClick={incrementQuantity}
                      disabled={
                        buyerForm.quantityPurchased >= product.productQuantity
                      }
                      className="px-4 py-2 bg-[var(--light-color)] font-bold disabled:opacity-50 borde rounded-full disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="buyerAddress"
                >
                  Delivery Address
                </label>
                <textarea
                  id="buyerAddress"
                  name="buyerAddress"
                  rows="3"
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                  value={buyerForm.buyerAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Order Summary */}
              <div className="bg-[var(--light-color)] p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span>{product.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>

                    <span>{buyerForm.quantityPurchased}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per unit:</span>
                    <span>₹{product.productPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>
                      ₹{product.productPrice * buyerForm.quantityPurchased}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!canPurchase}
                className={`w-full font-bold text-white py-3 rounded-xl transition 
                  ${canPurchase ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-500 opacity-50 cursor-not-allowed"}`}
              >
                {canPurchase ? "Confirm Purchase" : "Invalid Quantity"}
              </button>
              
              {!canPurchase && buyerForm.quantityPurchased > product.productQuantity && (
                <div className="text-red-600 text-sm text-center">
                  You cannot purchase more than {product.productQuantity} units. Available stock: {product.productQuantity}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyersForm;
