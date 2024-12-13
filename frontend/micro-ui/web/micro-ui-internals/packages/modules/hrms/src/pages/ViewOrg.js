import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ViewOrg = () => {
    const [departments] = useState(window.Digit.SessionStorage.get("initData").tenants);
    const history = useHistory();

    const handleModify = (department) => {
        history.push({
            pathname: '/digit-ui/employee/hrms/editOrg',
            state: { department }, // Passing selected department data
        });
    };

    return (
        <div>
            <style>
                {`
                    .table-container {
                        margin: 20px auto;
                        max-width: 90%;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                        background-color: #fff;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        font-family: Arial, sans-serif;
                        color: #333;
                    }

                    th, td {
                        padding: 12px 15px;
                        text-align: left;
                    }

                    th {
                        background-color: #23316b;
                        color: #fff;
                        font-weight: bold;
                        text-transform: uppercase;
                    }

                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }

                    tr:hover {
                        background-color: #f1f1f1;
                        transition: background-color 0.2s ease-in-out;
                    }

                    td {
                        border-bottom: 1px solid #ddd;
                    }

                    .status {
                        font-weight: bold;
                        text-transform: capitalize;
                    }

                    .status.ACTIVE {
                        color: green;
                    }

                    .status.INACTIVE {
                        color: red;
                    }

                    .header-title {
                        text-align: center;
                        margin: 20px 0;
                        font-size: 1.5rem;
                        color: #0073e6;
                    }

                    .action-btn {
                        padding: 6px 12px;
                        background-color: #23316b;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.2s ease-in-out;
                    }

                    .action-btn:hover {
                        background-color: #005bb5;
                    }
                `}
            </style>
         
            <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder", marginBottom: "25px",textAlign:"center" }}>Organization Details</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Telephone Number</th>
                            <th>Email Id</th>
                            <th>Address</th>
                            <th>District</th>
                            <th>State</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept, index) => (
                            <tr key={dept.id}>
                                <td>{index + 1}</td>
                                <td>{dept.name}</td>
                                <td>{dept.telephoneNumber}</td>
                                <td>{dept.emailId}</td>
                                <td>{dept.address}</td>
                                <td>{dept.district}</td>
                                <td>{dept.state}</td>
                                <td className={`status ${dept.status}`}>{dept.status}</td>
                                <td>
                                    <button 
                                        className="action-btn" 
                                        onClick={() => handleModify(dept)}>
                                        Modify
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewOrg;
