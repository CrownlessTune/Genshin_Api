import React, { useState } from 'react';
import LayoutPublic from '../layout/PublicLayout';
import LayoutPrivate from '../layout/PrivateLayout';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [formType, setFormType] = useState('login');
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  const handleLoginEmailChange = (e) => setEmail(e.target.value);
  const handleLoginPasswordChange = (e) => setPassword(e.target.value);

  const handleRegisterUsernameChange = (e) => setUsername(e.target.value);
  const handleRegisterConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleRegisterEmailChange = (e) => setEmail(e.target.value);

  const validateLoginForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!email || !password) {
      formErrors.login = 'Email and password are required';
      isValid = false;
    }

    setLoginErrors(formErrors);
    return isValid;
  };

  const validateRegisterForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!username || !email || !password || !confirmPassword) {
      formErrors.register = 'All fields are required';
      isValid = false;
    }

    if (password !== confirmPassword) {
      formErrors.register = 'Passwords do not match';
      isValid = false;
    }

    setRegisterErrors(formErrors);
    return isValid;
  };

  const handleFormTypeChange = (type) => {
    if (formType !== type) { // Solo cambia si es necesario
      setFormType(type);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      setLoggedIn(true);
      setFormType('home'); // Cambia al tipo de formulario home después del login
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateRegisterForm()) {
      alert('Registered successfully');
      setFormType('login'); // Regresa al formulario de login
    }
  };

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setLoginErrors({});
    setRegisterErrors({});
  };

  // Debug logs to check state values
  console.log('loggedIn:', loggedIn);
  console.log('formType:', formType);

  return (
    <>
      {loggedIn ? (
        <LayoutPrivate>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Welcome to the private layout!</h2>
            <p>You are now logged in.</p>
          </div>
        </LayoutPrivate>
      ) : (
        <LayoutPublic>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px' }}>
            <div style={{ width: '45%', textAlign: 'left' }}>
              <h2 style={{ textAlign: 'center' }}>
                {formType === 'login' ? 'Login' : 'Register'}
              </h2>

              {formType === 'login' && (
                <form onSubmit={handleLoginSubmit}>
                  <div>
                    <label htmlFor="login-email">Email:</label>
                    <input
                      type="email"
                      id="login-email"
                      value={email}
                      onChange={handleLoginEmailChange}
                      placeholder="Enter your email"
                      required
                      style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="login-password">Password:</label>
                    <input
                      type="password"
                      id="login-password"
                      value={password}
                      onChange={handleLoginPasswordChange}
                      placeholder="Enter your password"
                      required
                      style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                  </div>

                  {loginErrors.login && <span style={{ color: 'red' }}>{loginErrors.login}</span>}

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button type="submit" style={{ padding: '8px 16px', marginTop: '10px' }}>Log In</button>
                    <button
                      type="button"
                      onClick={() => handleFormTypeChange('register')}
                      style={{ padding: '8px 16px', marginTop: '10px' }}
                    >
                      Go to Register
                    </button>
                  </div>
                </form>
              )}

              {formType === 'register' && (
                <form onSubmit={handleRegisterSubmit}>
                  <div>
                    <label htmlFor="register-username">Username:</label>
                    <input
                      type="text"
                      id="register-username"
                      value={username}
                      onChange={handleRegisterUsernameChange}
                      placeholder="Choose a username"
                      required
                      style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="register-email">Email:</label>
                    <input
                      type="email"
                      id="register-email"
                      value={email}
                      onChange={handleRegisterEmailChange}
                      placeholder="Enter your email"
                      required
                      style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="register-password">Password:</label>
                    <input
                      type="password"
                      id="register-password"
                      value={password}
                      onChange={handleLoginPasswordChange}
                      placeholder="Enter your password"
                      required
                      style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="register-confirm-password">Confirm Password:</label>
                    <input
                      type="password"
                      id="register-confirm-password"
                      value={confirmPassword}
                      onChange={handleRegisterConfirmPasswordChange}
                      placeholder="Confirm your password"
                      required
                      style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                  </div>

                  {registerErrors.register && <span style={{ color: 'red' }}>{registerErrors.register}</span>}

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button type="submit" style={{ padding: '8px 16px', marginTop: '10px' }}>Register</button>
                    <button
                      type="button"
                      onClick={() => handleFormTypeChange('login')}
                      style={{ padding: '8px 16px', marginTop: '10px' }}
                    >
                      Go to Login
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </LayoutPublic>
      )}
    </>
  );
}

export default Auth;
