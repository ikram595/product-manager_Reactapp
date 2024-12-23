import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createProduct } from "../../api";

const ProductForm = ({ product = {} }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
    category: product.category || "",
    is_favorite: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      toast.success("product created successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("failed to create product. Try again.");

      if (err.response.status === 403) {
        navigate("/dashboard");
        toast.error("Access denied! You are not allowed to create products");
      }
      console.log(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-sky-950 text-white px-4 py-2 rounded w-full hover:bg-sky-900"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
