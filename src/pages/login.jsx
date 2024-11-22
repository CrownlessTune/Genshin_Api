import React from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import PublicLayout from '../layout/PublicLayout';

const Login = () => {
  const handleRegister = (formData) => {
    console.log('Register form submitted:', formData);
  };

  const handleLogin = (formData) => {
    console.log('Login form submitted:', formData);
  };

  return (
    <PublicLayout>
      <h1>Authentication</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '50px' }}>
        <div>
          <h2>Register</h2>
          <RegisterForm submitRegister={handleRegister} />
        </div>
        <div>
          <h2>Login</h2>
          <LoginForm submitLogin={handleLogin} />
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
