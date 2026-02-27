import React, { useState } from 'react';

const Login = ({ onSwitchToSignUp, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both your email and password to continue.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        onLogin(); // Navigate to dashboard
      } else {
        setError('Hmm, those credentials don\'t look right. Please try again.');
      }
    }, 1200);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🏥 HealthCare+</h1>
        <h2>Welcome back!</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing you in...' : 'Sign in 👋'}
          </button>
        </form>
        <div className="signup-link">
          New to HealthCare+? <a href="#signup" onClick={(e) => { e.preventDefault(); onSwitchToSignUp(); }}>Join us today!</a>
        </div>
      </div>
    </div>
  );
};

export default Login;