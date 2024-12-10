import React from 'react';

const ViewOrg = () => {
    const data = [
        { id: 'DPOST/E/2024/0017273', date: '27.08.24', department: 'Department of Posts', category: 'Speed Post', status: 'Pending' },
        { id: 'DPFPD/E/2024/0017263', date: '03.08.24', department: 'Department of Food and Public Distribution', category: 'International Courier', status: 'Pending' },
        { id: 'DOPOST/E/2024/0017263', date: '06.07.24', department: 'Department of Posts', category: 'Ration Card', status: 'Disposed' },
        { id: 'DMOLE/E/2024/0017263', date: '16.07.24', department: 'Department of Labour', category: 'Wage', status: 'Disposed' },
        { id: 'DOFIN/E/2024/0017263', date: '03.02.24', department: 'Department of Finance', category: 'Banks', status: 'Closed' },
    ];

    return (
        <div>
            <style>
                {
                    `
                    .table-container {
                        margin: 20px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        overflow: hidden;
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
                        background-color: #f2f2f2;
                        border-bottom: 2px solid #ccc;
                    }
                    
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    
                    tr:hover {
                        background-color: #f1f1f1;
                    }
                    
                    .pending {
                        color: red;
                    }
                    
                    .disposed {
                        color: green;
                    }
                    
                    .closed {
                        color: blue;
                    }
                    `
                }
            </style>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Grievance ID</th>
                        <th>Lodging Date</th>
                        <th>Department Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ViewOrg;