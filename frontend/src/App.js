import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RoleSelection from './components/RoleSelection';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userRole, setUserRole] = useState(null);

  const handleLogin = () => {
    setCurrentPage('roleSelection');
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('login');
  };

  if (currentPage === 'roleSelection') {
    return <RoleSelection onSelectRole={handleRoleSelect} />;
  }

  if (currentPage === 'dashboard') {
    return userRole === 'patient' ? 
      <PatientDashboard onLogout={handleLogout} /> : 
      <DoctorDashboard onLogout={handleLogout} />;
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