import React, { useState } from "react";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const LoginForm = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Success",
        text: "Login successful.",
        icon: "success",
      });
      console.log("Logged in user:", userCredential.user);
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
      <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
