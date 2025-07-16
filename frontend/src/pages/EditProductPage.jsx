import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function EditProductPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Verification state
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");

  // Form state (no email/password)
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productImages: [],
    productCategory: "",
    productQuantity: "",
  });

  // Fetch product and pre-fill form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getBackendUrl()}/api/product/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const productInformation = data.product;
        setForm({
          name: productInformation.sellerName || "",
          address: productInformation.sellerAddress || "",
          phone: productInformation.sellerPhone || "",
          productName: productInformation.productName || "",
          productDescription: productInformation.productDescription || "",
          productPrice: productInformation.productPrice || "",
          productImages: [], // for new uploads
          productCategory: productInformation.productCategory || "",
          productQuantity: productInformation.productQuantity || "",
        });
        setOriginalEmail(productInformation.sellerEmail || "");
        setOriginalPassword(productInformation.sellerPassword || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    setForm((prev) => ({ ...prev, productImages: Array.from(e.target.files) }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "productImages") {
        value.forEach((img) => formData.append("productImages", img));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(`${getBackendUrl()}/api/edit-product/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        navigate(`/product/${id}`);
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (error) {
      alert("Error updating product: " + error.message);
    }
  }
  const canSubmit =
    verifyEmail === originalEmail &&
    verifyPassword === originalPassword &&
    verifyEmail.length > 0 &&
    verifyPassword.length > 0;

  if (loading)
    return <div className="min-h-screen g-[var(--light-color)] flex items-center justify-center">Loading...</div>;
  if (error)
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;

  return (
    <>
      <BackButton />
      <div className="min-h-screen flex items-center justify-center bg-[var(--light-color)] flex-col gap-8 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white/30 p-8 rounded-xl shadow-md w-full max-w-2xl"
          encType="multipart/form-data"
        >
          {/* Verification Section */}
          <h2 className="text-xl font-bold mb-4 text-orange-600">Seller Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="verifyEmail">Email</label>
              <input id="verifyEmail" name="verifyEmail" type="email" className="w-full px-3 py-2 border rounded-xl outline-none" value={verifyEmail} onChange={e => setVerifyEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="verifyPassword">Password</label>
              <input id="verifyPassword" name="verifyPassword" type="password" className="w-full px-3 py-2 border rounded-xl outline-none" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} required />
            </div>
          </div>
          {/* Seller Information Section */}
          <h2 className="text-xl font-bold mb-4 text-orange-600">Seller Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input id="name" name="name" type="text" className="w-full px-3 py-2 border rounded-xl outline-none" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
              <input id="address" name="address" type="text" className="w-full px-3 py-2 border rounded-xl outline-none" value={form.address} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" className="w-full px-3 py-2 border rounded-xl outline-none" value={form.phone} onChange={handleChange} required />
            </div>
          </div>
          {/* Product Information Section */}
          <h2 className="text-xl font-bold mb-4 text-orange-600">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="productName">Product Name</label>
              <input id="productName" name="productName" type="text" className="w-full px-3 py-2 border rounded-xl outline-none" value={form.productName} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="productCategory">Product Category</label>
              <input id="productCategory" name="productCategory" type="text" className="w-full px-3 py-2 border rounded-xl outline-none" value={form.productCategory} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="productPrice">Product Price</label>
              <input id="productPrice" name="productPrice" type="number" min="0" step="0.01" className="w-full px-3 py-2 border rounded-xl outline-none" value={form.productPrice} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="productQuantity">Product Quantity</label>
              <input id="productQuantity" name="productQuantity" type="number" min="1" className="w-full px-3 py-2 border rounded-xl outline-none" value={form.productQuantity} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              {/* Show current images */}
              <label className="block text-black font mb-2">Current Image</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {form.productImages && form.productImages.length > 0 ? (
                  form.productImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(img)}
                      alt={`Product ${idx}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))
                ) : (
                  <span className="text-red-500 font-bold text-sm">No images uploaded yet.</span>
                )}
              </div>
              <label className="block text-gray-700 mb-2" htmlFor="productImages">Product Images (upload to replace)</label>
              <input id="productImages" name="productImages" type="file" className="w-full px-3 py-2 border rounded-xl outline-none" onChange={handleImageChange} multiple />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="productDescription">Product Description</label>
              <textarea id="productDescription" name="productDescription" className="w-full px-3 py-2 border rounded-xl outline-none" value={form.productDescription} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className={`${!canSubmit ? "opacity-50 cursor-not-allowed ":"hover:bg-orange-600 "} w-full bg-orange-500 font-bold text-white py-2 rounded-xl transition mt-4`} disabled={!canSubmit}>Update Product</button>
          {!canSubmit && (
            <div className="text-red-500 text-sm font-bold mt-2 text-center">Enter correct email and password to update product.</div>
          )}
        </form>
      </div>
    </>
  );
}

export default EditProductPage;
