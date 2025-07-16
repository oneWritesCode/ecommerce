import React from "react";

function AddProductForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productImages, setProductImages] = React.useState([]);
  const [productCategory, setProductCategory] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState("");

  function handleImageChange(e) {
    setProductImages(Array.from(e.target.files));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Collect all form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productQuantity", productQuantity);
    productImages.forEach((img) => {
      formData.append("productImages", img);
    });
    // Here you would typically send the formData to your backend
    // For now, just log the values

    const getBackendUrl = () => import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    fetch(`${getBackendUrl()}/api/add-product`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        window.location.href = "/";
      })
      .catch((error) => {
        // handle error
        console.error("Error:", error);
      });

    console.log({
      name,
      email,
      password,
      address,
      phone,
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity,
      productImages,
    });
  }

  return (
    //things a seller should provide
    // name                                                    required
    // email                                                   required
    // password                                                required
    // address                                                 required
    // phone number                                            required
    // product name                                            required
    // product description                                     required
    // email                                                   required
    // password                                                required
    // address                                                 required
    // phone number                                            required
    // product name                                            required
    // product description                                     required
    // product price                                           required
    // product image                                           required
    // multiple image >>>>>
    // product category                                        required
    // product quantity                                        required

    <div className="min-h-screen flex items-center justify-center bg-[var(--light-color)] flex-col gap-8 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 p-8 rounded-xl shadow-md w-full max-w-2xl"
        encType="multipart/form-data"
      >
        {/* Seller Information Section */}
        <h2 className="text-xl font-bold mb-4 text-orange-600">
          Seller Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Product Information Section */}
        <h2 className="text-xl font-bold mb-4 text-orange-600">
          Product Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="productCategory"
            >
              Product Category
            </label>
            <input
              id="productCategory"
              type="text"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="productPrice">
              Product Price
            </label>
            <input
              id="productPrice"
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="productQuantity"
            >
              Product Quantity
            </label>
            <input
              id="productQuantity"
              type="number"
              min="1"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="productDescription"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              className="w-full px-3 py-2 border rounded-xl resize-none outline-none"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="productImages">
              Product Images
            </label>
            <input
              id="productImages"
              type="file"
              className="w-full px-3 py-2 border rounded-xl outline-none"
              onChange={handleImageChange}
              multiple
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 font-bold text-white py-2 rounded-xl hover:bg-orange-600 transition mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
