import React, { useState } from 'react';
import ChatBot from './ChatBot';
import DoctorPanel from './DoctorPanel';
import '../styles/Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [activePanel, setActivePanel] = useState('overview');

  const panels = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'chatbot', name: 'AI Assistant', icon: '🤖' },
    { id: 'doctors', name: 'Book Appointment', icon: '👨‍⚕️' },
    { id: 'records', name: 'Medical Records', icon: '📋' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
    { id: 'reports', name: 'Lab Reports', icon: '🧪' }
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
            <h2>Welcome to AI Healthcare Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <h3>3</h3>
                  <p>Upcoming Appointments</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-info">
                  <h3>12</h3>
                  <p>AI Consultations</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>5</h3>
                  <p>Health Reports</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="coming-soon">
            <h2>{panels.find(p => p.id === activePanel)?.name}</h2>
            <p>This feature is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏥 AI Healthcare</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span>Welcome, User</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
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