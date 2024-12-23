import React from "react";
import { FaHeart, FaRegHeart, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { deleteProduct } from "../../api";

const ProductCard = ({ product, onToggleFavorite }) => {
  const navigate = useNavigate();

  const onEdit = async () => {
    navigate(`/products/edit/${product.id}`);
  };
  const onDelete = async (productId) => {
    Swal.fire({
      title: "Do you want to delete this product?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteProduct(productId);
        toast.success("product deleted successfully");
      }
    });
  };
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-gray-600">Price: ${product.price}</p>
      <p className="text-gray-600">Category: {product.category}</p>
      <div className="mt-4 space-x-2">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={onEdit}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <FaTrashAlt />
        </button>
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="text-red-500 text-xl hover:text-red-600"
        >
          {product.is_favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
