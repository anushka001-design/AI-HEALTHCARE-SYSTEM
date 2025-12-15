import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <Login onSwitchToSignUp={() => setCurrentPage('signup')} onLogin={handleLogin} />
      ) : (
        <SignUp onSwitchToLogin={() => setCurrentPage('login')} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;