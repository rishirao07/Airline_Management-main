import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PassengerDetails = ({ travelers }) => {
  const [passengerForms, setPassengerForms] = useState(() => {
    const initialForms = [];
    for (let i = 0; i < 1; i++) {
      initialForms.push({
        title: '',
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        mobile: '',
      });
    }
    return initialForms;
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'firstName' || name === 'lastName') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrorMessage(`${name === 'firstName' ? 'First' : 'Last'} Name should contain only letters.`);
        return;
      }
    } 
    const updatedForms = [...passengerForms];
    updatedForms[index][name] = value;
    setPassengerForms(updatedForms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAnyFormIncomplete = passengerForms.some(form => {
      for (const field in form) {
        if (form[field] === '') {
          return true;
        }
      }
      return false;
    });

    if (isAnyFormIncomplete) {
      setErrorMessage('Please fill out all the fields.');
      return;
    }

    axios.post('http://localhost:3000/api/passenger-details', passengerForms)
      .then(response => {
        navigate('/searchresults/passenger-details/payment');
      })
      .catch(error => {
        console.error('Error saving passenger details:', error);
        setErrorMessage('An error occurred while saving passenger details.');
      });
  };

  return (
    <div className="passengerDetailsContainer">
      <h1>Passenger Details</h1>
      {passengerForms.map((formData, index) => (
        <div key={index} className="passengerSection">
          <h2>Passenger {index + 1}</h2>
          <div className="inputContainer">
            <div className="inputBox">
              <label htmlFor={`title-${index}`}>Title:</label>
              <select id={`title`} name={`title`} value={formData.title} onChange={(e) => handleChange(e, index)}>
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
              </select>
            </div>
            <div className="passengerSection">
              <div className="inputBox">
                <label htmlFor={`firstName-${index}`}>First Name:</label>
                <input type="text" id={`firstName`} name={`firstName`} value={formData.firstName} onChange={(e) => handleChange(e, index)} />
              </div>
              <div className="inputBox">
                <label htmlFor={`lastName-${index}`}>Last Name:</label>
                <input type="text" id={`lastName`} name={`lastName`} value={formData.lastName} onChange={(e) => handleChange(e, index)} />
              </div>
              <div className="inputBox">
                <label htmlFor={`dob-${index}`}>Date of Birth:</label>
                <input type="date" id={`dob`} name={`dob`} value={formData.dob} onChange={(e) => handleChange(e, index)} />
              </div>
            </div>
            <div className="contactSection">
              <div className="inputBox">
                <label htmlFor={`email-${index}`}>Email Address:</label>
                <input type="email" id={`email`} name={`email`} value={formData.email} onChange={(e) => handleChange(e, index)} />
              </div>
              <div className="inputBox">
                <label htmlFor={`mobile-${index}`}>Mobile:</label>
                <PhoneInput
                  inputProps={{
                    name: `mobile-${index}`,
                    id: `mobile-${index}`,
                    required: true
                  }}
                  country={'in'}
                  value={formData.mobile}
                  onChange={(value) => {
                    const updatedForms = [...passengerForms];
                    updatedForms[index].mobile = value;
                    setPassengerForms(updatedForms);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="confirm" onClick={handleSubmit}>Confirm</button>
    </div>
  );
};

export default PassengerDetails;