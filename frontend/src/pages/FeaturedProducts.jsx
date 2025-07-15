import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const getBackendUrl = () => import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [User, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
    console.log(userFromStorage);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getBackendUrl()}/api/all-products`, {
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
      <div className="min-h-screen bg-[var(--light-color)] flex items-center justify-center text-white text-2xl">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--light-color)] flex items-center justify-center text-red-500 flex-col">
        <p className="font-bold text-2xl">
          404 | {error} :{"("}{" "}
        </p>
        <br /> please check your internet connection
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[var(--light-color)] p-4">
      <div className="max-w-full  mx-auto relative">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Featured Products
        </h1>

        <div className="absolute top-0 right-0 bg-gradient-to-l from-[var(--light-color)] to-transparent w-100 h-full "></div>
        <div className="absolute top-0 left-0 bg-gradient-to-r from-[var(--light-color)] to-transparent w-100 h-full "></div>
        {products.length === 0 ? (
          <div className="text-center text-gray-500">No products found</div>
        ) : (
          <div className="flex flex-row overflow-x-auto gap-10 w-full pb-12 hide-scrollbar pr-[15vw] pl-[13vw]">
            {products.map((product, idx) => (
              <div
                key={product._id || idx}
                className="min-w-[300px] max-w-[320px] flex-shrink-0 p-2 rounded-xl shadow-xl bg-white/30 overflow-hidden hover:shadow-2xl hover:scale-101 transition-all"
              >
                {product.productImages && product.productImages.length > 0 && (
                  <img
                    src={`${getBackendUrl()}${product.productImages[0]}`}
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
                  <div className="flex justify-between items-center my-3">
                    <span className="text-orange-600 text-xl font-bold">
                      {product.productPrice && Number(product.productPrice) > 0
                        ? `$ ${product.productPrice}`
                        : "Free"}
                    </span>
                    <span className="text-sm">
                      {product.productQuantity > 0 ? (
                        `Qty : ${product.productQuantity}`
                      ) : (
                        <span className="bg-orange-500 font-bold py-1 px-2 rounded-2xl text-white">
                          sold out
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs mt-2">
                    Category:{" "}
                    <span className="px-2 py-1 bg-[var(--light-color)] rounded-3xl">
                      {product.productCategory}
                    </span>
                  </p>
                  <NavLink
                    to={`/product/${product._id}`}
                    className="mt-6 mb-2 inline-block w-full text-center hover:bg-[var(--dark-color)]/80 hover:px-10 transition-all text-white font-medium py-1 rounded bg-[var(--dark-color)]"
                  >
                    View Product
                  </NavLink>
                  {product.productQuantity > 0 ? (
                    User ? (
                      <button className="w-full border-2 border-[var(--light-color)] rounded mt-auto">
                        <NavLink
                          to={`/buy-product/${product._id}`}
                          className="flex items-center justify-between text-[20px] text-white bg-[var(--light-color)]
                     text-medium capitalize font-normal px-2 py-1 hover:bg-[var(--dark-color)]/60 hover:px-10 transition-all"
                        >
                          shop now  
                          <ArrowBigRight />
                        </NavLink>
                      </button>
                    ) : (
                      <button className="w-full border-2 border-[var(--light-color)] rounded mt-auto">
                      <NavLink
                        to="/login"
                        className="flex items-center justify-between text-[20px] text-white bg-[var(--light-color)]
                   text-medium capitalize font-normal px-2 py-1 hover:bg-[var(--dark-color)]/60 hover:px-10 transition-all"
                      >
                       login to shop
                        <ArrowBigRight />
                      </NavLink>
                    </button>
                    )
                  ) : (
                    <p
                      className="cursor-not-allowed text-[20px] text-white bg-[var(--light-color)]
                        text-medium capitalize text-center px-2 py-1 font-bold"
                    >
                      sold out
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedProducts;
