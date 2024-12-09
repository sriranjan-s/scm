import { Toast, Loader } from "@upyog/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AddHeadOfDepartment = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  const [departments, setDepartments] = useState(window.Digit.SessionStorage.get("initData").tenants);
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userType] = useState("Head of Department");
  const [role] = useState("Head of Department");
  const [state] = useState("Active");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stateUser, setStateuser] = useState("");
//   useEffect(() => {
//     // Fetch departments from system
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
    userType,
    tenantId,
  };
  let Employees = [
    {
      tenantId: tenantId,
      employeeStatus: "EMPLOYED",
      assignments: [ {
        "fromDate": new Date().getTime(),
        "isCurrentAssignment": true,
        "department": department,
        "designation": userType
    }],
      code: undefined,
      dateOfAppointment: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
      employeeType: "PERMANENT",
      jurisdictions: [
        {
            "hierarchy": "REVENUE",
            "boundaryType": "City",
            "boundary": department,
            "tenantId": department,
            "roles": [
                {
                    "code": role,
                    "name": role,
                    "labelKey": role,
                    "tenantId": department
                },
                {
                  "code": "EMPLOYEE",
                  "name": "Employee",
                  "labelKey": "ACCESSCONTROL_ROLES_ROLES_EMPLOYEE",
                  "tenantId": department
              }
            ]
        }
    ],
      user: {
        mobileNumber: mobileNumber,
        name: name,
        correspondenceAddress: stateUser,
        emailId: confirmEmail,
        gender: "MALE",
        dob: 507254400000,
        roles: [{
          "code": "EMPLOYEE",
          "name": "Employee",
          "labelKey": role,
          "tenantId": "pg.citya"
      }],
        tenantId: tenantId,
      },
      serviceHistory: [],
      education: [],
      tests: [],
    },
  ];
    /* use customiseCreateFormData hook to make some chnages to the Employee object */
    Employees=Digit?.Customizations?.HRMS?.customiseCreateFormData?Digit.Customizations.HRMS.customiseCreateFormData(data,Employees):Employees;
    navigateToAcknowledgement(Employees)
}
const navigateToAcknowledgement = (Employees) => {
  history.replace("/digit-ui/employee/hrms/response", { Employees, key: "CREATE", action: "CREATE" });
}

  if (isLoading) return <Loader />;

  return (
    <div>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f4f7;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
          h3 {
            text-align: center;
            color: #23316b;
            margin-bottom: 20px;
          }
          label {
            display: block;
            margin-bottom: 5px;
            color: #23316b;
          }
          input, select {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          button {
            background-color: #f57c00;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
          }
          button:hover {
            background-color: #e65c00;
          }
          .error {
            color: red;
            margin-bottom: 15px;
          }
        `}
      </style>
      <div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="login-form" style={{ width: "100%", padding: "0 5%" }}>
      <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" }}>Add Head of Department</h3>
        {showToast && <Toast label="Head of Department added successfully!" />}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Department/Ministry</label>
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

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            maxLength={10}
          />

          <label>Official Email ID</label>
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

          <label>User Type/Designation</label>
          <input type="text" value={userType} readOnly />

          <label>Role</label>
          <input type="text" value={role} readOnly />
          <label>State</label>
        <input type="text" value={stateUser} readOnly />
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

export default AddHeadOfDepartment;
