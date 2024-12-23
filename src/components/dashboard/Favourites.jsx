import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import loading from "../../assets/loader.gif";
import { fetchFavorites } from "../../api";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const response = await fetchFavorites({ page: 1 });
        const fetchedFavorites = response.data;
        setFavorites(fetchedFavorites);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch favorites.");
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Products</h1>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <img src={loading} alt="Loading" height={50} width={50} />
        </div>
      ) : error ? (
        <p className="py-4 text-red-500">{error}</p>
      ) : favorites.length === 0 ? (
        <p className="py-4 text-gray-500">No favorite products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
