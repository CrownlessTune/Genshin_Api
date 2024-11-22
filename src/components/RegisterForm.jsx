import React, { useState } from "react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const RegisterForm = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match.",
        icon: "error",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Success",
        text: "User registered successfully.",
        icon: "success",
      });
      console.log("Registered user:", userCredential.user);
      setFormData(initialState);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "15px" }}>
      <input
        name="username"
        type="text"
        placeholder="Enter your username"
        onChange={handleChange}
        value={formData.username}
      />
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        name="password"
        type="password"
        placeholder="Enter your password"
        onChange={handleChange}
        value={formData.password}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        onChange={handleChange}
        value={formData.confirmPassword}
      />
      <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
