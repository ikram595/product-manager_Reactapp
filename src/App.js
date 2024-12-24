import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/shared/Navbar";
import loading from "./assets/loader.gif";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const Dashboard = React.lazy(() =>
    import("./components/dashboard/Dashboard")
  );
  const Favorites = React.lazy(() =>
    import("./components/dashboard/Favourites")
  );
  const ProductForm = React.lazy(() =>
    import("./components/product/ProductForm")
  );
  const Login = React.lazy(() => import("./components/auth/Login"));
  const Register = React.lazy(() => import("./components/auth/Register"));
  const EditForm = React.lazy(() => import("./components/product/EditForm"));

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
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <img src={loading} alt="Loading" height={50} width={50} />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/favorites"
              element={
                isAuthenticated ? <Favorites /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/products/edit/:productId"
              element={
                isAuthenticated ? <EditForm /> : <Navigate to="/login" />
              }
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
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
