import React, { useState } from 'react';

const Login = ({ onSwitchToSignUp, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Simple validation - in real app, validate with backend
    if (email && password) {
      setError('');
      onLogin(); // Navigate to dashboard
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>AI Healthcare</h1>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="#signup" onClick={(e) => { e.preventDefault(); onSwitchToSignUp(); }}>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;