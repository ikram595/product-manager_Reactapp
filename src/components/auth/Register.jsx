import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Add success state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await registerUser(formData);
      setSuccess(true); // Show success message
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 mb-4">
          Registration successful! Redirecting to login...
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
