import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchProducts, updateProduct } from "../../api";
import ProductCard from "./ProductCard";
import loading from "../../assets/loader.gif";
import Pagination from "../shared/Pagination";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProducts({ page: 1 });
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        //get unique categories
        const uniqueCategories = [
          ...new Set(fetchedProducts.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        toast.error("Failed to load products. Try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  //relatime filter+search
  useEffect(() => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    //category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (sortOrder === "asc") return a.price - b.price;
        if (sortOrder === "desc") return b.price - a.price;
        return 0;
      });
    }
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortOrder, products]);

  const toggleFavorite = async (productId) => {
    try {
      const product = products.find((p) => p.id === productId);
      if (!product) {
        toast.error("Product not found. try again");
        return;
      }
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, is_favorite: !product.is_favorite }
            : product
        )
      );
      const updatedData = { ...product, is_favorite: !product.is_favorite };
      await updateProduct(productId, updatedData);
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Failed to update product:", error);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, is_favorite: !product.is_favorite }
            : product
        )
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-sky-950 px-4 py-2 rounded hover:bg-sky-900 text-white"
        >
          Create Product
        </button>
      </div>

      <div className="flex flex-wrap space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          className="border p-2 rounded w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded w-1/4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded w-1/4"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <img src={loading} alt="Loading" height={50} width={50} />
        </div>
      ) : products.length === 0 ? (
        <p className="py-4 text-gray-500">No products added yet.</p>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            <b>Total products: </b>
            {filteredProducts.length}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts
              .slice(
                (currentPage - 1) * productsPerPage,
                currentPage * productsPerPage
              )
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
          </div>
          <Pagination
            totalItems={filteredProducts.length}
            itemsPerPage={productsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
