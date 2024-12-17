import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons
import CreateEmployee from "./createEmployee";
import  EditOrg from './EditOrg';
const ManageOrganization = () => {
    const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupNew, setShowPopupNew] = useState(false);  // State for popup visibility
  const [departments] = useState(window.Digit.SessionStorage.get("initData").tenants);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const data = departments.map(org => ({
    ...org,
    type: 'Ministry' // Override type as Ministry
}));

  const filteredData = data.filter((org) => {
    return (
      (typeFilter === 'All' || org.type === typeFilter) &&
      (statusFilter === 'All' || org.status === statusFilter) &&
      (searchTerm === '' || org.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  // Function to handle Edit Button click
  const handleEdit = (org) => {
    setSelectedOrganization(org); // Set row data to state
    setShowPopupNew(true); // Show the popup
  };
  return (
    <div className="manage-organization">
      <style>
        {`
          .manage-organization {
            padding: 20px;
            background-color: #f0f4f8;
          }

          h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }

          .filters {
            margin-bottom: 20px;
          }

          .filters select,
          .filters input {
            margin-right: 10px;
            padding: 5px;
          }

          .table-container {
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            padding: 10px;
            text-align: left;
          }

          th {
            background-color: #145d80;
            color: white;
          }

          td {
            background-color: white;
          }

          .action-icons {
            display: flex;
            gap: 10px;
            cursor: pointer;
            font-size: 16px;
          }

          .add-org-button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ff7f50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>

      <h1>Manage Organization</h1>

      {/* Filters */}
      <div className="filters">
        <label style={{ marginRight: '20px' }}>Type</label>
        <select onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
          <option value="All">All</option>
          <option value="Ministry">Ministry</option>
          <option value="Department">Department</option>
        </select>

        <label style={{ marginRight: '20px' }}>Status</label>
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="All">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <input
          type="text"
          placeholder="Search by Code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Organization Name</th>
              <th>Type (Ministry/Department)</th>
              <th>Head</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((org) => (
              <tr key={org.code}>
                <td>{org.code}</td>
                <td>{org.name}</td>
                <td>{org?.type}</td>
                <td>{org.head}</td>
                <td style={{ color: org.status === 'ACTIVE' ? 'green' : 'red' }}>{org.status}</td>
                <td>
                <div className="action-icons">
                    <FaEdit style={{ color: 'blue' }} title="Edit" onClick={() => handleEdit(org)} />
                    <FaTrashAlt style={{ color: 'red' }} title="Delete" />
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Organization Button */}
      <button className="add-org-button" onClick={() => setShowPopup(true)}>
        Add New Organization
      </button>
       {/* Popup for Edit */}
       {showPopupNew && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup" onClick={() => setShowPopupNew(false)}>
              X
            </button>
            {/* Pass selectedOrganization as props */}
            <EditOrg data={selectedOrganization} />
          </div>
        </div>
      )}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup" onClick={() => setShowPopup(false)}>X</button>
            <CreateEmployee />
          </div>
        </div>
      )}

      {/* Inline CSS */}
      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 100px;
            left: 120px;
            width: 100%;
            height: calc(100% - 100px);
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .popup-content {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            width: 80%;
            max-height: 90%;
            overflow-y: auto;
            position: relative;
          }

          .close-popup {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
            width:auto;
          }

          .add-org-button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ff7f50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>
    
    </div>
  );
};

export default ManageOrganization;
