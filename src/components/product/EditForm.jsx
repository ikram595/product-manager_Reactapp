import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProduct, updateProduct } from "../../api";

const EditForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (err) {
        toast.error("Failed to fetch product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, product);
      toast.success("Product updated successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update product. Try again.");

      if (err.response?.status === 403) {
        navigate("/dashboard");
        toast.error("Access denied! You are not allowed to update products");
      }
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading product details...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-sky-950 text-white px-4 py-2 rounded w-full hover:bg-sky-950"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditForm;
