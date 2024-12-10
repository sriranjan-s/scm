import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ministries = [
  { name: "Financial Services (Banking Division)", icon: "🏦" },
  { name: "Labour and Employment", icon: "👷" },
  { name: "Central Board of Direct Taxes (Income Tax)", icon: "💰" },
  { name: "Posts", icon: "📬" },
  { name: "Telecommunications", icon: "📡" },
  { name: "Home Affairs", icon: "🏛️" },
  { name: "Housing and Urban Affairs", icon: "🏗️" },
  { name: "Personnel and Training", icon: "👔" },
  { name: "Health & Family Welfare", icon: "🏥" },
  { name: "Financial Services (Insurance Division)", icon: "📋" },
];

const MinistrySelector = () => {
  const [departments, setDepartments] = useState(
    window.Digit.SessionStorage.get("initData").departments
  );
  const [department, setDepartment] = useState("");
  const { t } = useTranslation();
  const history = useHistory();

  const handleBoxClick = (event,name) => {
    event.preventDefault()
    history.push(`/digit-ui/citizen/pgr/create-complaint/newGriveance/${name}`);
  };

  return (
    <div className="ministry-selector">
      <style>
        {`
            .ministry-selector {
                text-align: center;
                padding: 20px;
              }
              
              .box-container {
                display: grid;
                flex-wrap: wrap;
                justify-content: center;
                grid-template-columns: repeat(5, 1fr);
                margin-bottom: 20px;
              }
              
              .ministry-box {
                background-color: #23316b;
                color: white;
                border-radius: 8px;
                margin: 10px;
                text-align: center;
                transition: background-color 0.3s;
                cursor: pointer;
              }
              
              .ministry-box:hover {
                background-color: #0056b3;
              }
              
              .ministry-icon {
                font-size: 40px; /* Adjust size as needed */
              }
              
              .dropdown-container {
                margin-top: 20px;
              }
              .headerTopic{
                font-weight: 900;
                font-size: xx-large;
                color: #23316b;
            }
            #department {
                border: 1px solid #ccc;
                border-radius: 5px;
              }
            `}
      </style>
      <h2 className="headerTopic">
        Please select a Ministry/Department/State Government
      </h2>
      <div className="box-container">
        {ministries.map((ministry, index) => (
          <div
            className="ministry-box"
            key={index}
            onClick={(event) => handleBoxClick(event,ministry.name)}
          >
            <div
              style={{
                width: "100%",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#cfd9e5",
                borderRadius: "8px 8px 0px 0px",
              }}
            >
              <span className="ministry-icon">{ministry.icon}</span>
            </div>
            <div style={{ width: "100%", minHeight: "50px" }}>
              <p>{ministry.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="department" style={{ color: "#23316b" }}>
          Department/Ministry
        </label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        >
          <option value="">Select Department/Ministry</option>
          {departments?.map((dep) => (
            <option key={dep?.code} value={dep?.code}>
              {dep?.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MinistrySelector;
