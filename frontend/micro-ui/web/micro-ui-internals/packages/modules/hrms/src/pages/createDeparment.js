import { Toast, Loader } from "@upyog/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const CreateDepartment = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userType, setUserType] = useState("Admin");
  const [role, setRole] = useState("Admin");
  const [state, setState] = useState("Active");
  const [designation, setDesignation] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Fetch departments and pre-defined options
//     Digit.HRMSService.getDepartments(tenantId).then((data) => {
//       setDepartments(data || []);
//       setIsLoading(false);
//     });
//   }, []);

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

    // Save department details
    Digit.HRMSService.createDepartment(payload).then((response) => {
      if (response.status === "success") {
        setShowToast(true);
        setTimeout(() => history.push("/departments"), 2000);
      } else {
        setError("Failed to save department details!");
      }
    });
  };

  if (isLoading) return <Loader />;

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

   <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" }}>Add Department (Nodal Level)</h3>
      {showToast && <Toast label="Department added successfully!" />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="blueColor">Department/Ministry</label>
        <select
        id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        >
          <option value="">Select Department/Ministry</option>
          <option value="Ministry A">Ministry A</option>
            <option value="Ministry B">Ministry B</option>
            <option value="Ministry C">Ministry C</option>
          {departments.map((dept) => (
            <option key={dept.code} value={dept.code}>
              {dept.name}
            </option>
          ))}
        </select>

        <label>Mobile Number</label>
        <input
          type="tel"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          maxLength={10}
        />

        <label>Email ID</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Confirm Email ID</label>
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          required
        />

        <label>Designation</label>
        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />

        <label>User Type</label>
        <input type="text" value={userType} readOnly />

        <label>Role</label>
        <input type="text" value={role} readOnly />

        <label>Status</label>
        <select value={state} onChange={(e) => setState(e.target.value)} id="status"  style={{ width: "100%", padding: "10px", marginBottom: "15px" }} required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default CreateDepartment;
