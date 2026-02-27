import React from 'react';

const RoleSelection = ({ onSelectRole }) => {
  return (
    <div className="login-container">
      <div className="role-selection-box">
        <h1>🏥 AI Healthcare</h1>
        <h2>Choose your role to continue</h2>
        <div className="role-buttons-container">
          <button 
            className="role-button patient-button" 
            onClick={() => onSelectRole('patient')}
          >
            <div className="role-icon">👤</div>
            <div className="role-content">
              <h3>Patient</h3>
              <p>Access your health records and get AI assistance</p>
            </div>
            <div className="role-arrow">→</div>
          </button>
          
          <button 
            className="role-button doctor-button" 
            onClick={() => onSelectRole('doctor')}
          >
            <div className="role-icon">🩺</div>
            <div className="role-content">
              <h3>Doctor</h3>
              <p>Manage patients and review medical data</p>
            </div>
            <div className="role-arrow">→</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;