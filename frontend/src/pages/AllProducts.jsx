import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/all-products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success:", data);

        // Check if data has products array or if it's directly an array
        if (data.products) {
          setProducts(data.products);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error while fetching data :: error ::", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 flex-col">
       <p className="font-bold text-2xl">404 |   {error} :{"("} </p>
      <br/> please check your internet
        connection
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-30 bg-[var(--light-color)] p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Featured Products
        </h1>

        {products.length === 0 ? (
          <div className="text-center text-gray-500">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <div
                key={product._id || idx}
                className="-2 p-2 rounded-xl shadow-xl bg-white/30 overflow-hidden hover:shadow-2xl hover:scale-101 transition-all"
              >
                {product.productImages && product.productImages.length > 0 && (
                  <img
                    src={`http://localhost:8000${product.productImages[0]}`}
                    alt={product.productName}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                <div className="p-2">
                  <h3 className="text-lg font-semibold text capitalize mb-2">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2 whitespace-break-spaces">
                    {product.productDescription}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600 text-xl font-bold">
                      ₹{product.productPrice}
                    </span>
                    <span className="text-sm">
                      Qty: {product.productQuantity}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs mt-2">
                    Category: <span className="px-2 py-1 bg-[var(--light-color)] rounded-3xl">{product.productCategory}</span>
                  </p>
                  <NavLink
                    to={`/product/${product._id}`}
                    className="mt-6 mb-2 inline-block w-full text-center text-white font-medium py-1 rounded bg-[var(--dark-color)] transition"
                  >
                    View Product
                  </NavLink>
                  <button className="w-full border-2 border-[var(--light-color)] rounded mt-auto">
                    <NavLink 
                    to={`/buy-product/:${product._id}`}
                    className="flex items-center justify-between text-[20px] text-white bg-[var(--light-color)]
                    text-medium capitalize font-normal px-2 py-1">
                      shop now
                    <ArrowBigRight/>
                    </NavLink>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
