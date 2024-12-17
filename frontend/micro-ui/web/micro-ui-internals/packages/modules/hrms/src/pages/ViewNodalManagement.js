import React, { useState,useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons
import CreateEmployee from "./createEmployee";
import  EditOrg from './EditOrg';
import AddHeadOfDepartment from "./createHOD";
import AddOffice from "./AddGro"
import AddSna from './AddSna';
const ManageNodalUser = () => {
    const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [orgFilter, setOrgFilter] = useState('pg');
  const typeFilterMap = {
    "Head of the Departments": "HOD",
    "Sub Nodal Appellant Authority": "SNAA",
    "Grievance Routing Officer": "GRO",
    "All": "All", // Special case for 'All'
  };
  
  const organizationName =Digit.ULBService.getCurrentTenantId();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupNew, setShowPopupNew] = useState(false);  // State for popup visibility
  const [departments] = useState(window.Digit.SessionStorage.get("initData").tenants);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = window.Digit.SessionStorage.get("User");
  const [data,setData] =useState([])
  const user = ["NODAL_ADMIN", "GRO", "HOD_DEPT","SUB_NAA"] // Example roles array
  const [selectedUserType, setSelectedUserType] = useState('');
  const userTypes = ["Head of Department", "GRO","Sub Nodal Appellant Authority"];
  const organizations = ["Organization 1", "Organization 2", "Organization 3"];
console.log("departments",departments)
 useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3002/egov-hrms/employees/_search?tenantId=${tenantId}&roles=NODAL_ADMIN,HOD_DEPT,GRO,SUB_NAA&_=1734310245681`;

      const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
      };

      const body = {
        RequestInfo: {
          apiId: 'Rainmaker',
          authToken: userInfo?.access_token || '',
          userInfo: userInfo?.info,
          msgId: '1734310245681|en_IN',
        },
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const orgData = result?.Employees || [];
        setData(orgData)
       // setDepartments(orgData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((org) => {
    const matchedRole = org?.user?.roles.find(role => user.includes(role.code));
    const userType = matchedRole ? matchedRole.code : null;
    return (
      (typeFilter === "All" || userType === typeFilterMap[typeFilter]) &&
      (statusFilter === "All" || (org.isActive && statusFilter === "ACTIVE") || (!org.isActive && statusFilter === "INACTIVE")) &&
      (searchTerm === "" || org.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  
  // Function to handle Edit Button click
  const handleEdit = (org) => {
    setSelectedOrganization(org); // Set row data to state
    setShowPopupNew(true); // Show the popup
  };
  const displayUserRole =(user,rolesData)=> {
    console.log("user,rolesData",user,rolesData)
    // Iterate over each role in rolesData and check if it exists in userRoles
    const matchedRole = rolesData.find(role => user.includes(role.code));
    
    // If a match is found, return the name; otherwise, return null
    return matchedRole ? matchedRole.name : null;
}
const handleUserTypeChange = (e) => {
    setSelectedUserType(e.target.value);
  };

  const handleOrganizationChange = (e) => {
    setSelectedOrganization(e.target.value);
  };

  const renderUserTypeComponent = () => {
    switch (selectedUserType) {
      case "Head of Department":
        return <div><AddHeadOfDepartment /></div>; // Replace with actual component
      case "GRO":
        return <div><AddOffice /></div>; // Replace with actual component
      case "Sub Nodal Appellant Authority":
            return <div><AddSna /></div>; // Replace with actual component
      default:
        return null;
    }
  };
  console.log("orgFilter",filteredData,organizationName)
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

      <h1>Nodal User Management</h1>

      {/* Filters */}
      <div className="filters">
        <label style={{ marginRight: '20px' }}>Type</label>
        <select onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
  <option value="All">All</option>
  <option value="Head of the Departments">Head of Department</option>
  <option value="Sub Nodal Appellant Authority">SNAA</option>
  <option value="Grievance Routing Officer">GRO</option>
</select>

        <label style={{ marginRight: '20px' }}>Org Name</label>
        <select onChange={(e) => setStatusFilter(e.target.value)} value={orgFilter}>
        {departments.map((dept) => (
                    <option key={dept.code} value={dept.code}>
                      {dept.i18nKey}
                    </option>
                  ))}
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
              <th>Employee Code</th>
              <th>Name</th>
              <th>Organization Type</th>
              <th>Organization Name</th>
              <th>User Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((org) => (
              <tr key={org.code}>
                <td>{org.code}</td>
                <td>{org?.user?.name}</td>
                <td>Ministry</td>
                <td>{org.head}</td>
                <td>{displayUserRole(user,org.user.roles)}</td>
                <td style={{ color: org.isActive == true ? 'green' : 'red' }}>{org.isActive == true? "Active":"In Active"}</td>
                <td>
                <div className="action-icons">
                    <FaEdit style={{ color: 'blue' }} title="Edit"  />
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
        Add New User
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
            
            {/* User Type Dropdown */}
            <div className="filters" style={{display:"flex"}}>
        <label style={{ marginRight: '20px' }}>Select User Type</label>
        <select id="userType" value={selectedUserType} style={{width:"50%"}}onChange={handleUserTypeChange}>
                <option value="">Select</option>
                {userTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            
        <label style={{ marginRight: '20px' }}>Org Name</label>
        <select onChange={(e) => setStatusFilter(e.target.value)} style={{width:"50%"}} value={statusFilter}>
          <option value="All">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        </div>
            {/* Organization Dropdown */}
            {/* <div>
              <label htmlFor="organization">Select Organization</label>
              <select id="organization" value={selectedOrganization} onChange={handleOrganizationChange}>
                <option value="">Select</option>
                {organizations.map((org, index) => (
                  <option key={index} value={org}>{org}</option>
                ))}
              </select>
            </div> */}

            {/* Render Component Based on User Type */}
            {renderUserTypeComponent()}

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

export default ManageNodalUser;
