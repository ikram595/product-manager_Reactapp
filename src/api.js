import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response.data.detail || "An error occurred";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    const { access_token } = response.data;
    if (access_token) {
      localStorage.setItem("token", access_token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "An error occurred";
  }
};

export const fetchProducts = async (params = {}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  try {
    const response = axios.get(`${API_BASE_URL}/products`, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      throw (
        error.response.data.detail ||
        "An error occurred while creating the product"
      );
    }
  }
};
export const fetchFavorites = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/products/favorites`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (err) {
    throw (
      err.response.data.detail ||
      "error occured while adding product to favourites"
    );
  }
};
export const getProduct = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login"; // Redirect to login
    throw new Error("Unauthorized");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.detail ||
      "An error occurred while fetching the product."
    );
  }
};
export const createProduct = async (productData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const response = axios.post(`${API_BASE_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // If the token is expired or invalid, redirect to login page
      localStorage.removeItem("token"); // Remove invalid token
      window.location.href = "/login"; // Redirect to login
    } else {
      throw (
        error.response.data.detail ||
        "An error occurred while creating the product"
      );
    }
    if (error.response.status === 403) {
    }
  }
};

export const updateProduct = async (productId, productData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");
  return axios.put(`${API_BASE_URL}/products/${productId}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteProduct = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");
  return axios.delete(`${API_BASE_URL}/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
