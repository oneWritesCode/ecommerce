import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, Eye } from 'lucide-react';
import BackButton from '../components/BackButton';

function Cart() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getBackendUrl()}/cart/getCart/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCart(data.cart);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleBuyNow = (productId) => {
    navigate(`/buy-product/${productId}`);
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`${getBackendUrl()}/cart/removeItem/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update the cart state with the new cart data
      setCart(data.cart);
      
      // Show success message (you can add a toast notification here)
      console.log('Item removed successfully');
      
    } catch (error) {
      console.error('Error removing item:', error);
      // Show error message (you can add a toast notification here)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--light-color)] flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--light-color)] flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-10 bg-[var(--light-color)]">
        <BackButton />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-white">
            <p className="text-lg">Your cart is empty</p>
            <p className="mt-2">Add some products to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);
  };

  return (
    <div className="min-h-screen pt-10 bg-[var(--light-color)]">
      {/* <BackButton /> */}
      
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Cart</h1>
        
         <div className="bg-whte/30 rounded-2xl p-6 shaow-xl">
          {/* Cart Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white/30 text-sm text-left text-gray-700 border-4 border-[var(--light-color)] rounded-xl overflow-hidden">
              <thead className="bg-[var(--light-color)] text-white ">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  {/* <th className="px-4 py-3 text-left">Quantity</th> */}
                  {/* <th className="px-4 py-3 text-left">Total</th> */}
                  <th className="px-4 py-3 text-left">Seller</th>
                  <th className="px-4 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => (
                  <tr
                //   onClick={() => handleViewProduct(item.productId)}
                //   title="View Product Details"
                  key={index} className="border-b border-[var(--light-color)]/30 hover:bg-white/20 ">

                    
                    {/* Product Column */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 flex-shrink-0">
                          {item.productImages && item.productImages.length > 0 && (
                            <img
                              src={`${getBackendUrl()}${item.productImages[0]}`}
                              alt={item.productName}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 cursor-pointer hover:text-orange-600 transition-colors"
                              onClick={() => handleViewProduct(item.productId)}>
                            {item.productName}
                          </h3>
                          <p className="text-gray-600 text-xm  line-clamp-2 whitespace-break-spaces">{item.productDescription}</p>
                          {/* <p className="text-gray-500 text-xs">Category: {item.productCategory}</p> */}
                        </div>
                      </div>
                    </td>
                    
                    {/* Price Column */}
                    <td className="px-4 py-4">
                      <span className="text-orange-600 font-bold">${item.productPrice}</span>
                    </td>
                    
                    {/* Quantity Column */}
                    {/* <td className="px-4 py-4">
                      <p className="font-medium text-center">{item.quantity}</p>
                    </td> */}
                    
                    {/* Total Column */}
                    {/* <td className="px-4 py-4">
                      <span className="text-orange-600 font-bold">₹{item.productPrice * item.quantity}</span>
                    </td> */}
                    
                    {/* Seller Column */}
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-sm">{item.sellerName}</p>
                        {/* <p className="text-gray-500 text-xs">{item.sellerEmail}</p> */}
                      </div>
                    </td>
                    
                    {/* Actions Column */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-center">
                        <button
                          onClick={() => handleViewProduct(item.productId)}
                          className="bg-[var(--dark-color)] text-white px-3 py-2 rounded-lg hover:bg-[var(--dark-color)]/80 transition-colors font-medium whitespace-nowrap cursor-pointer"
                        >
                          <Eye size={24} />
                        </button>
                        <button
                          onClick={() => handleBuyNow(item.productId)}
                          className="bg-[var(--dark-color)] text-white px-3 py-2 rounded-lg hover:bg-[var(--dark-color)]/80 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove from Cart"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Cart Summary */}
          <div className="border-t border-gray-200 pt-6 mt-20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-bold text-gray-800">Total Items:</span>
              <span className="text-xl font-bold text-gray-800">
                {cart.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-800">Total Amount:</span>
              <span className="text-2xl font-bold text-orange-600">${calculateTotal()}</span>
            </div>
            
            {/* //  Checkout Button  */}
            {/* <button className="w-full text-white py-3 px-6 rounded-xl font-bold text-sm  transition-colors">
             @allcopyright reserved
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart; 