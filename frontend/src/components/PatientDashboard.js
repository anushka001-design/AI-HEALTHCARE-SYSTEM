import React, { useState } from 'react';
import '../styles/Dashboard.css';

const PatientDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('chatbot');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your AI Health Assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, medication: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', doctor: 'Dr. Smith' }
  ]);
  const [reports, setReports] = useState([
    { id: 1, name: 'Blood Test Report', date: '2024-01-15', type: 'Lab' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: 'I understand your concern. Based on your symptoms, I recommend consulting with a doctor.', 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReports([...reports, { 
        id: Date.now(), 
        name: file.name, 
        date: new Date().toISOString().split('T')[0], 
        type: 'Uploaded' 
      }]);
    }
  };

  const tabs = [
    { id: 'chatbot', name: 'AI Chatbot', icon: '🤖' },
    { id: 'prescriptions', name: 'Prescriptions', icon: '💊' },
    { id: 'reports', name: 'Upload Reports', icon: '📤' },
    { id: 'history', name: 'History', icon: '📋' }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🏥 AI Healthcare - Patient</h1>
        <div className="user-info">
          <span>Welcome, Patient</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-text">{tab.name}</span>
            </button>
          ))}
        </nav>

        <main className="main-content">
          {activeTab === 'chatbot' && (
            <div className="chatbot-panel">
              <h2>🤖 AI Health Assistant</h2>
              <div className="chat-messages">
                {messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                    <div className="message-content">{msg.text}</div>
                  </div>
                ))}
              </div>
              <div className="chat-input-form">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your symptoms..."
                />
                <button onClick={handleSend}>Send</button>
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="prescriptions-panel">
              <h2>💊 My Prescriptions</h2>
              <div className="prescriptions-list">
                {prescriptions.map(rx => (
                  <div key={rx.id} className="prescription-card">
                    <h3>{rx.medication}</h3>
                    <p><strong>Dosage:</strong> {rx.dosage}</p>
                    <p><strong>Frequency:</strong> {rx.frequency}</p>
                    <p><strong>Prescribed by:</strong> {rx.doctor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="upload-panel">
              <h2>📤 Upload Medical Reports</h2>
              <div className="upload-area">
                <input type="file" id="fileUpload" onChange={handleFileUpload} style={{display: 'none'}} />
                <label htmlFor="fileUpload" className="upload-btn">
                  📁 Choose File to Upload
                </label>
                <p>Upload your lab reports, prescriptions, or medical documents</p>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-panel">
              <h2>📋 Medical History</h2>
              <div className="reports-list">
                {reports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-icon">📄</div>
                    <div className="report-info">
                      <h3>{report.name}</h3>
                      <p>Date: {report.date}</p>
                      <p>Type: {report.type}</p>
                    </div>
                    <button className="view-btn">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
