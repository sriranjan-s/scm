import { Toast, Loader } from "@upyog/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditHeadOfDepartment = ({data}) => {
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
  const [state,setStatus] = useState("Active");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stateUser, setStateuser] = useState("");
  const [password, setPassword] = useState("")
  const [formData, setFormData] =useState(data)

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
console.log("formData",formData)
    // const payload = {
    //   department,
    //   mobileNumber,
    //   email,
    //   userType,
    //   role,
    //   state,
    //   userType,
    //   tenantId,
    // };
    //  let Employees = [
    //   {
    //     tenantId: "pg",
    //     employeeStatus: "EMPLOYED",
    //     assignments: [{
    //       "fromDate": new Date().getTime(),
    //       "isCurrentAssignment": true,
    //       "department": "DEPT_10",
    //       "designation": userType
    //     }],
    //     code: null,
    //     dateOfAppointment: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    //     employeeType: "PERMANENT",
    //     jurisdictions: [
    //       {
    //       "roles": [{
    //         "label": "Employee",
    //         "value": "EMPLOYEE"
    //     },
    //     {
    //         "label": "HOD_DEPT",
    //         "value": "HOD_DEPT"
    //     },
    //     {
    //         "label": "HRMS ADMIN",
    //         "value": "HRMS_ADMIN"
    //     }
    //     ],
    //     "hierarchy": "ADMIN",
    //     "boundaryType": "City",
    //     "boundary": department,
    //     "tenantId": department,
    //   }],
    //     user: {
    //       mobileNumber: mobileNumber,
    //       name: name,
    //       correspondenceAddress: stateUser,
    //       emailId: confirmEmail,
    //       gender: "MALE",
    //       dob: 507254400000,
    //       roles: [{
    //         "code": "HOD_DEPT",
    //         "labelKey": "HOD_DEPT",
    //         "name": "HOD_DEPT",
    //         "tenantId": department
    //     },
    //     {
    //         "code": "EMPLOYEE",
    //         "labelKey": "ACCESSCONTROL_ROLES_ROLES_EMPLOYEE",
    //         "name": "Employee",
    //         "tenantId": department
    //     },
    //     {
    //         "code": "HRMS_ADMIN",
    //         "labelKey": "ACCESSCONTROL_ROLES_ROLES_HRMS_ADMIN",
    //         "name": "HRMS_ADMIN",
    //         "tenantId": department
    //     }],
    //       tenantId: department,
    //     },
    //     serviceHistory: [],
    //     education: [],
    //     tests: [],
    //   }
    // ];
    let Employees = [
        {
...formData,
jurisdictions: [
    {
        ...formData.jurisdictions[0],
    "roles": [{
      "label": "Employee",
      "value": "EMPLOYEE"
  },
  {
      "label": "HOD_DEPT",
      "value": "HOD_DEPT"
  },
  {
      "label": "HRMS ADMIN",
      "value": "HRMS_ADMIN"
  }
  ],
  "hierarchy": "ADMIN",
  "boundaryType": "City",
  "boundary": department,
  "tenantId": department
}],
user:{
 ...formData.user,
    mobileNumber: mobileNumber,
    name: name,
    correspondenceAddress: stateUser,
    emailId: confirmEmail,
    gender: "MALE",
    roles: [{
        "code": "HOD_DEPT",
        "labelKey": "HOD_DEPT",
        "name": "HOD_DEPT",
        "tenantId": department
    },
    {
        "code": "EMPLOYEE",
        "labelKey": "ACCESSCONTROL_ROLES_ROLES_EMPLOYEE",
        "name": "Employee",
        "tenantId": department
    },
    {
        "code": "HRMS_ADMIN",
        "labelKey": "ACCESSCONTROL_ROLES_ROLES_HRMS_ADMIN",
        "name": "HRMS_ADMIN",
        "tenantId": department
    }],
      tenantId: department,
}
        }
    ]
    console.log("Employ",Employees)
    // /* use customiseCreateFormData hook to make some chnages to the Employee object */
     Employees = Digit?.Customizations?.HRMS?.customiseCreateFormData ? Digit.Customizations.HRMS.customiseCreateFormData(data, Employees) : Employees;
    console.log("EmployeesEmployees",Employees)
     navigateToAcknowledgement(Employees)
  }
  const navigateToAcknowledgement = (Employees) => {
    history.replace("/digit-ui/employee/hrms/response", { Employees, key: "UPDATE", action: "UPDATE" });
  }
  useEffect(() => {
    if (formData) {
        console.log("formData",formData)
        let data =formData
        setName(data?.user?.name)
        setEmail(data?.user?.emailId)
        setConfirmEmail(data?.user?.emailId)
        setStateuser(data?.user?.correspondenceAddress)
        setMobileNumber(data?.user?.mobileNumber)
        setDepartment(data?.jurisdictions[0].boundary)
    }
  }, [formData]);
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
  
        h3 {
          color: #23316b;
          margin-bottom: 20px;
          font-weight: bolder;
          text-align: center;
        }
  
        .grid-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* Two fields per row */
          gap: 16px;
          margin-bottom: 20px;
        }
  
        .form-group {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 15px;
        }
  
        label {
          flex: 0.3;
          text-align: right;
          font-weight: bold;
          color: #23316b;
        }
  
        input, select {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
  
        button {
          background-color: #f57c00;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          margin-top: 20px;
        }
  
        button:hover {
          background-color: #e65c00;
        }
  
        .error {
          color: red;
          margin-bottom: 15px;
        }
  
        .card {
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          max-width:none;
        }
      `}
    </style>
  
    <div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="login-form" style={{ width: "100%", padding: "0 5%" }}>
        {showToast && <Toast label="Head of Department added successfully!" />}
        {error && <p className="error">{error}</p>}
  
        <form onSubmit={handleSubmit}>
          {/* Basic Details Card */}
          <div className="card">
            <h4>Basic Details</h4>
            <div className="grid-container">
              <div className="form-group">
                <label htmlFor="department">Department/Ministry</label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => {
                    const selectedCode = e.target.value;
                    setDepartment(selectedCode);
  
                    const selectedDept = departments.find((dept) => dept.code === selectedCode);
                    if (selectedDept) {
                      setStateuser(selectedDept.state);
                    }
                  }}
                  required
                >
                  <option value="">Select Department/Ministry</option>
                  {departments.map((dept) => (
                    <option key={dept.code} value={dept.code}>
                      {dept.i18nKey}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
  
          {/* Contact Details Card */}
          <div className="card">
            <h4>Contact Details</h4>
            <div className="grid-container">
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  maxLength={10}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Official Email ID</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmEmail">Confirm Email ID</label>
                <input
                  type="email"
                  id="confirmEmail"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid-container">
              <div className="form-group">
                <label>User Type/Designation</label>
                <input type="text" value={userType} readOnly required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input type="text" value={role} readOnly required />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" value={stateUser} readOnly required />
              </div>
            </div>
          </div>
  

          <div className="card">
            <h4>Login Details</h4>
            <div className="grid-container">
              <div className="form-group">
                <label htmlFor="mobileNumber">Login Id</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  value={confirmEmail}
                  required
                  maxLength={10}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Password</label>
                <input
                  type="email"
                  id="email"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  id="status"
                  value={state}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
          </div>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default EditHeadOfDepartment;
