import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/shared/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Favorites from "./components/dashboard/Favourites";
import ProductForm from "./components/product/ProductForm";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EditForm from "./components/product/EditForm";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="container mx-auto p-4">
        <Toaster
          toastOptions={
            ({
              success: {
                style: {
                  background: "green",
                  color: "white",
                  textDecoration: "bold",
                },
              },
              error: {
                style: {
                  background: "red",
                  color: "white",
                  textDecoration: "bold",
                },
              },
            },
            { position: "bottom-center" })
          }
        />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/favorites"
            element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />}
          />
          <Route
            path="/products/edit/:productId"
            element={isAuthenticated ? <EditForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={
              isAuthenticated ? <ProductForm /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
