import React, { useState } from 'react';
import '../styles/Dashboard.css';

const DoctorDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('queue');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [message, setMessage] = useState('');
  
  const [queue] = useState([
    { id: 1, patientName: 'John Doe', symptoms: 'Fever, Headache', aiPrescription: 'Paracetamol 500mg' },
    { id: 2, patientName: 'Jane Smith', symptoms: 'Cough, Cold', aiPrescription: 'Cough Syrup' }
  ]);

  const [patients] = useState([
    { id: 1, name: 'John Doe', age: 35, lastVisit: '2024-01-15' },
    { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2024-01-10' },
    { id: 3, name: 'Mike Johnson', age: 42, lastVisit: '2024-01-08' }
  ]);

  const [patientHistory] = useState({
    1: [
      { date: '2024-01-15', diagnosis: 'Viral Fever', prescription: 'Paracetamol' },
      { date: '2023-12-20', diagnosis: 'Common Cold', prescription: 'Antihistamine' }
    ],
    2: [
      { date: '2024-01-10', diagnosis: 'Seasonal Allergy', prescription: 'Cetirizine' }
    ],
    3: [
      { date: '2024-01-08', diagnosis: 'Hypertension', prescription: 'Amlodipine' }
    ]
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Message sent to ${selectedPatient?.name}: ${message}`);
      setMessage('');
    }
  };

  const tabs = [
    { id: 'queue', name: 'Prescription Queue', icon: '📋' },
    { id: 'patients', name: 'Patient List', icon: '👥' },
    { id: 'messaging', name: 'Messaging', icon: '💬' }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🏥 AI Healthcare - Doctor</h1>
        <div className="user-info">
          <span>Dr. Welcome</span>
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
          {activeTab === 'queue' && (
            <div className="queue-panel">
              <h2>📋 Draft Prescriptions from AI</h2>
              <div className="queue-list">
                {queue.map(item => (
                  <div key={item.id} className="queue-card">
                    <div className="queue-header">
                      <h3>{item.patientName}</h3>
                      <button 
                        className="view-history-btn"
                        onClick={() => setSelectedPatient(patients.find(p => p.name === item.patientName))}
                      >
                        View History
                      </button>
                    </div>
                    <p><strong>Symptoms:</strong> {item.symptoms}</p>
                    <p><strong>AI Suggested:</strong> {item.aiPrescription}</p>
                    <div className="queue-actions">
                      <button className="approve-btn">✓ Approve</button>
                      <button className="edit-btn">✎ Edit</button>
                      <button className="reject-btn">✗ Reject</button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedPatient && (
                <div className="patient-history-modal">
                  <div className="modal-content">
                    <h3>Patient History - {selectedPatient.name}</h3>
                    <div className="history-list">
                      {patientHistory[selectedPatient.id]?.map((record, idx) => (
                        <div key={idx} className="history-item">
                          <p><strong>Date:</strong> {record.date}</p>
                          <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                          <p><strong>Prescription:</strong> {record.prescription}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setSelectedPatient(null)}>Close</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="patients-panel">
              <h2>👥 Patient List</h2>
              <div className="patients-list">
                {patients.map(patient => (
                  <div 
                    key={patient.id} 
                    className="patient-card"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="patient-avatar">👤</div>
                    <div className="patient-info">
                      <h3>{patient.name}</h3>
                      <p>Age: {patient.age}</p>
                      <p>Last Visit: {patient.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedPatient && (
                <div className="patient-details">
                  <h3>Medical History - {selectedPatient.name}</h3>
                  <div className="history-list">
                    {patientHistory[selectedPatient.id]?.map((record, idx) => (
                      <div key={idx} className="history-item">
                        <p><strong>Date:</strong> {record.date}</p>
                        <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                        <p><strong>Prescription:</strong> {record.prescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messaging' && (
            <div className="messaging-panel">
              <h2>💬 Patient Communication</h2>
              <div className="messaging-container">
                <div className="patient-selector">
                  <h3>Select Patient</h3>
                  {patients.map(patient => (
                    <div 
                      key={patient.id}
                      className={`patient-item ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      {patient.name}
                    </div>
                  ))}
                </div>

                {selectedPatient && (
                  <div className="message-area">
                    <h3>Message to {selectedPatient.name}</h3>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message or voice note..."
                      rows="5"
                    />
                    <div className="message-actions">
                      <button onClick={handleSendMessage} className="send-btn">📤 Send Text</button>
                      <button className="voice-btn">🎤 Voice Message</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
