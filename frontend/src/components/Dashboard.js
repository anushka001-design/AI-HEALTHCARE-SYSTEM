import React, { useState } from 'react';
import ChatBot from './ChatBot';
import DoctorPanel from './DoctorPanel';
import '../styles/Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [activePanel, setActivePanel] = useState('overview');

  const panels = [
    { id: 'overview', name: 'Home', icon: '🏠' },
    { id: 'chatbot', name: 'AI Assistant', icon: '💬' },
    { id: 'doctors', name: 'Find Doctors', icon: '👩‍⚕️' },
    { id: 'records', name: 'My Records', icon: '📋' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
    { id: 'reports', name: 'Lab Results', icon: '🧪' }
  ];

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'chatbot':
        return <ChatBot />;
      case 'doctors':
        return <DoctorPanel />;
      case 'overview':
        return (
          <div className="overview-panel">
            <h2>Welcome to your health dashboard! 👋</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <h3>3</h3>
                  <p>Upcoming appointments</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-info">
                  <h3>12</h3>
                  <p>AI conversations</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>5</h3>
                  <p>Health reports</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="coming-soon">
            <h2>{panels.find(p => p.id === activePanel)?.name} 🚀</h2>
            <p>We're working hard to bring you this feature soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏥 HealthCare+</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span>Hey there! 😊</span>
            <button onClick={onLogout} className="logout-btn">Sign out</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="sidebar">
          <div className="nav-panels">
            {panels.map(panel => (
              <button
                key={panel.id}
                className={`nav-item ${activePanel === panel.id ? 'active' : ''}`}
                onClick={() => setActivePanel(panel.id)}
              >
                <span className="nav-icon">{panel.icon}</span>
                <span className="nav-text">{panel.name}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="main-content">
          {renderActivePanel()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;