import React from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import PublicLayout from "../layout/PublicLayout";
import "../sass/pages/_Login.scss";

const Login = () => {
  const handleRegister = (formData) => {
    console.log("Register form submitted:", formData);
  };

  const handleLogin = (formData) => {
    console.log("Login form submitted:", formData);
  };

  return (
    <PublicLayout>
      <h1 className="auth-title">Authentication</h1>
      <div className="auth-container">
        <div className="auth-section">
          <h2 className="auth-subtitle">Register</h2>
          <RegisterForm submitRegister={handleRegister} />
        </div>
        <div className="auth-section">
          <h2 className="auth-subtitle">Login</h2>
          <LoginForm submitLogin={handleLogin} />
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
