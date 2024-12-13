import { Toast, Loader } from "@upyog/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
const CreateDepartment = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  const [departments, setDepartments] = useState(window.Digit.SessionStorage.get("initData").tenants);
  const [department, setDepartment] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userType, setUserType] = useState("Admin");
  const [role, setRole] = useState("NODAL_ADMIN");
  const [state, setState] = useState("Active");
  const [stateUser, setStateuser] = useState("");
  const [designation, setDesignation] = useState("Nodal Officer");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      setError("Emails do not match!");
      return;
    }

    if (!mobileNumber.match(/^[6-9]\d{9}$/)) {
      setError("Invalid mobile number!");
      return;
    }

    const payload = {
      department,
      mobileNumber,
      email,
      userType,
      role,
      state,
      designation,
      tenantId,
    };
    let Employees = [
      {
        tenantId: tenantId,
        employeeStatus: "EMPLOYED",
        assignments: [{
          "fromDate": new Date().getTime(),
          "isCurrentAssignment": true,
          "department": "DEPT_10",
          "designation": designation
        }],
        dateOfAppointment: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
        employeeType: "PERMANENT",
        jurisdictions: [
          {
          "hierarchy": "ADMIN",
          "boundaryType": "City",
          "boundary": department,
          "tenantId": department,
        "roles":[
          {
              "hierarchy": "ADMIN",
              "boundaryType": "City",
              "boundary": department,
              "tenantId": department,
              "roles": [
                  {
                    "label": "NODAL_ADMIN",
                      "value": "NODAL_ADMIN",
                    
                  },
                  {
                    "value": "EMPLOYEE",
                    "label": "Employee",
                   
                },
                {
                  "label": "HRMS_ADMIN",
                  "value": "HRMS_ADMIN",  
              }
              ]
          }
    ]}],
        user: {
          mobileNumber: mobileNumber,
          name: name,
          correspondenceAddress: stateUser,
          emailId: confirmEmail,
          gender: "MALE",
          dob: 507254400000,
          roles: [{
            "code": "NODAL_ADMIN",
            "name": "NODAL_ADMIN",
            "labelKey": "NODAL_ADMIN",
            "tenantId": department
        },
        {
          "code": "EMPLOYEE",
          "name": "Employee",
          "labelKey": "ACCESSCONTROL_ROLES_ROLES_EMPLOYEE",
          "tenantId": department
      },
      {
        "code": "HRMS_ADMIN",
        "name": "HRMS_ADMIN",
        "labelKey": "ACCESSCONTROL_ROLES_ROLES_HRMS_ADMIN",
        "tenantId": department
    }],
          tenantId: department,
        },
        serviceHistory: [],
        education: [],
        tests: [],
      },
    ];
    /* use customiseCreateFormData hook to make some chnages to the Employee object */
    Employees = Digit?.Customizations?.HRMS?.customiseCreateFormData ? Digit.Customizations.HRMS.customiseCreateFormData(data, Employees) : Employees;
    navigateToAcknowledgement(Employees)
  }
  const navigateToAcknowledgement = (Employees) => {
    history.replace("/digit-ui/employee/hrms/response", { Employees, key: "CREATE", action: "CREATE" });
  }

  //if (isLoading) return <Loader />;

  return (
    <div>
      <style>
        {`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f4f7;
                    margin: 0;
                    padding: 0;
                }

                .grid-container {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 16px;
                }

                @media (min-width: 520px) {
                  .grid-container .half-width {
                    grid-template-columns: repeat(2, 1fr); 
                  }
                }

                @media (min-width: 768px) {
                  .grid-container {
                    grid-template-columns: 1fr 
                  }
                  .grid-container .half-width {
                    grid-template-columns: repeat(2, 1fr); 
                  }
                  .grid-container .full-width {
                    grid-template-columns: 1fr 
                  }
                  .grid-container .one-third-width {
                    grid-template-columns: repeat(3, 1fr) 
                  }
                }

                .login-container {
                    max-width: 100%;
                    margin: auto;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                .login-section {
                    padding: 20px;
                }
                
                h3 {
                    text-align: center;
                }
                
                label {
                    display: block;
                    margin: 10px 0 5px;
                }
                
                input {
                    width: calc(100% - 20px);
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                
                .otp-container {
                    display: flex;
                    
                    gap: 10px;
                }
                
                button {
                    background-color: #f57c00; /* Orange color */
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 50%;
                }
                
                button:hover {
                    background-color: #e65c00;
                }
                
                .submit-button {
                    display: block;
                    width: 50%;
                    margin: 20px auto;
                }
                
                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 10px 0;
                }
                
                .social-login {
                    text-align: center;
                    margin: 20px 0;
                }
                
                .social-icon {
                    width: 30px;
                    margin: 0 10px;
                    cursor: pointer;
                }
                #department {
                  border: 1px solid #ccc;
    border-radius: 5px;
                }
                #address{
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
                #status{
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
                label{
                    color:#23316b
                }
                `}
      </style>

      <div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="login-form" style={{ width: "100%", padding: "0 5%" }}>

          <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder", marginBottom: "25px" }}>Add Department (Nodal Level)</h3>
          {showToast && <Toast label="Department added successfully!" />}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit} className="grid-container">
            <div className="grid-container">
              <label className="blueColor">Department/Ministry</label>
              <select
                id="department"
                value={department}
                onChange={(e) => {
                  const selectedCode = e.target.value; // Get the selected code
                  setDepartment(selectedCode);

                  // Find the selected department object
                  const selectedDept = departments.find((dept) => dept.code === selectedCode);
                  if (selectedDept) {
                    setStateuser(selectedDept.state); // Update stateUser
                  }

                  // Set default role and user type
                  setRole("NODAL_ADMIN");
                  setUserType("Nodal User");
                  setDesignation("Nodal Officer")
                }}
                required
                style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              >
                <option value="">Select Department/Ministry</option>
                {departments.map((dept) => (
                  <option key={dept.code} value={dept.code}>
                    {dept.i18nKey}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid-container half-width">
              <div>
                <label>Name</label>
                <input
                  type="tel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={10}
                />
              </div>
              <div>
                <label>Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  maxLength={10}
                />
              </div>
              <div>
                <label>Email ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Confirm Email ID</label>
                <input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>User Type/Designation</label>
                <input
                  type="text"
                  value={designation}
                  readOnly
                  required
                />
              </div>
              <div>
                <label>Role</label>
                <select
                  id="department"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                >
                  <option value="NODAL_ADMIN">{t("Nodal Admin")}</option>
                  <option value="EMPLOYEE">{t("EMPLOYEE")}</option>
                </select>
              </div>
              <div>
                <label>State</label>
                <input type="text" value={stateUser} readOnly required/>
              </div>
              <div>
                <label>Status</label>
                <select value={state} onChange={(e) => setState(e.target.value)} id="status" style={{ width: "100%", padding: "10px", marginBottom: "15px" }} required>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <button type="submit"
              className="submit-button"
              style={{
                backgroundColor: "#23316b",
                color: "white",
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;
