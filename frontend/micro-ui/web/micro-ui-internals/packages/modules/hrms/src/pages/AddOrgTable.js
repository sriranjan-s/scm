import React, { useState } from 'react';
//import './AddOrganization.css'; // Import the CSS file for styling

const AddOrganization = () => {
  const [organizationType, setOrganizationType] = useState('Ministry');
  const [departmentName, setDepartmentName] = useState('Health & Family Welfare');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ organizationType, departmentName, email, telephone, pinCode, address, status });
  };

  return (
    <div className="form-container">
        <style>
            {
                `.form-container {
                    width: 400px;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    margin: auto;
                  }
                  
                  h2 {
                    text-align: center;
                  }
                  
                  h3 {
                    margin-top: 20px;
                  }
                  
                  .form-group {
                    margin-bottom: 15px;
                  }
                  
                  label {
                    display: block;
                    margin-bottom: 5px;
                  }
                  
                  input, select, textarea {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                  }
                  
                  textarea {
                    height: 60px;
                  }
                  
                  .button-container {
                    display: flex;
                    justify-content: space-between;
                  }
                  
                  .save-button, .close-button {
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                  }
                  
                  .save-button {
                    background-color: #ff7f50;
                    color: white;
                  }
                  
                  .close-button {
                    background-color: #ccc;
                  }
                `
            }
        </style>
      <h2>Add New Organization</h2>
      <form onSubmit={handleSubmit}>
        <h3>Basic Details</h3>
        <div className="form-group">
          <label>Organization Type</label>
          <select value={organizationType} onChange={(e) => setOrganizationType(e.target.value)}>
            <option value="Ministry">Ministry</option>
            <option value="Department">Department</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label>Name of Department/Ministry</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </div>

        <h3>Contact Details</h3>
        <div className="form-group">
          <label>E-Mail ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Telephone Number ID</label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Pin Code</label>
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="button-container">
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="close-button">Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddOrganization;