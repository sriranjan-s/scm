import React from "react";

const Dashboard = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      {/* Header */}
      <style>
        {
            `
            .nameHeader{
                display: flex;
                align-items: center;
                background-color: #fff;
                padding: 15px;
                border-radius: 20px;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 10px;
            }
            `
        }
      </style>
      <div
        className="nameHeader"
      >
        <img
          src="https://via.placeholder.com/50"
          alt="User"
          style={{ borderRadius: "50%", marginRight: "10px" }}
        />
        <h2 style={{ margin: 0 }}>Welcome Mr. Amit Sharma</h2>
      </div>

      {/* Modules Section */}
      <h3 style={{ marginTop: "20px" }}>Modules</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Module Cards */}
        <div
          style={{
            backgroundColor: "#f6c6ac",
            borderRadius: "12px",
            width: "150px",
            textAlign: "center",
            padding: "15px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "30px", marginBottom: "10px" }}>⚙️</div>
          <div>
            <strong>Manage Organization</strong>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#e9ecef",
            borderRadius: "12px",
            width: "150px",
            textAlign: "center",
            padding: "15px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "30px", marginBottom: "10px" }}>💼</div>
          <div>
            <strong>User Management</strong>
          </div>
        </div>
      </div>

      {/* Dashboard & Analytics Section */}
      <h3 style={{ marginTop: "30px" }}>Dashboard & Analytics</h3>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Chart Card */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            width: "55%",
          }}
        >
          {/* <h4>Trend Analysis - Audit</h4> */}
          <img
            src="https://via.placeholder.com/650x200"
            alt="Analytics Graph"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <button
            style={{
              marginTop: "10px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
        </div>

        {/* Latest Updates */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            flex: "1",
          }}
        >
          <h4>Latest Updates</h4>
          <p style={{ margin: "5px 0" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>1,500</span> New
            Grievance raised today
          </p>
          <p style={{ margin: "5px 0" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>100</span> new
            Appeals raised
          </p>
          <p style={{ margin: "5px 0" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>23</span> new
            offices created
          </p>
          <p style={{ margin: "5px 0" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>50+</span> Pending
            grievances delayed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
