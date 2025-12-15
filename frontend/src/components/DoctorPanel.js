import React, { useState } from 'react';

const DoctorPanel = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      experience: '15 years',
      image: '👩⚕️',
      availability: ['09:00', '10:30', '14:00', '15:30']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      rating: 4.8,
      experience: '12 years',
      image: '👨⚕️',
      availability: ['08:30', '11:00', '13:30', '16:00']
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      rating: 4.7,
      experience: '10 years',
      image: '👩⚕️',
      availability: ['09:30', '12:00', '14:30', '17:00']
    }
  ];

  const handleBookAppointment = () => {
    if (selectedDoctor && appointmentDate && appointmentTime) {
      alert(`Appointment booked with ${selectedDoctor.name} on ${appointmentDate} at ${appointmentTime}`);
      setSelectedDoctor(null);
      setAppointmentDate('');
      setAppointmentTime('');
    }
  };

  return (
    <div className="doctor-panel">
      <div className="panel-header">
        <h2>👨⚕️ Book Doctor Appointment</h2>
        <p>Choose from our expert medical professionals</p>
      </div>

      <div className="doctors-grid">
        {doctors.map(doctor => (
          <div 
            key={doctor.id} 
            className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <div className="doctor-image">{doctor.image}</div>
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p className="specialty">{doctor.specialty}</p>
              <div className="doctor-details">
                <span className="rating">⭐ {doctor.rating}</span>
                <span className="experience">{doctor.experience}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="appointment-booking">
          <h3>Book Appointment with {selectedDoctor.name}</h3>
          <div className="booking-form">
            <div className="form-group">
              <label>Select Date:</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>Available Times:</label>
              <div className="time-slots">
                {selectedDoctor.availability.map(time => (
                  <button
                    key={time}
                    className={`time-slot ${appointmentTime === time ? 'selected' : ''}`}
                    onClick={() => setAppointmentTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="book-btn"
              onClick={handleBookAppointment}
              disabled={!appointmentDate || !appointmentTime}
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPanel;