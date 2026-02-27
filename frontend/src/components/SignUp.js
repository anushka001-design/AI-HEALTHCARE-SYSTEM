import React, { useState } from 'react';

// Change this URL to update the background image
const BACKGROUND_IMAGE_URL = process.env.REACT_APP_BACKGROUND_IMAGE || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

const SignUp = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Oops! Please fill in all the fields to continue.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords don\'t match. Please double-check and try again.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password should be at least 6 characters long for your security.');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Welcome aboard!', { name, email });
      // TODO: Add actual registration logic
    }, 1500);
  };

  return (
    <div className="login-container" style={{
      backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="login-box">
        <h1>🏥 HealthCare+</h1>
        <h2>Join our caring community</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">What should we call you?</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your email address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Create a secure password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm your password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Type your password again"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating your account...' : 'Get started 🚀'}
          </button>
        </form>
        <div className="signup-link">
          Already part of our family? <a href="#login" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Welcome back!</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;