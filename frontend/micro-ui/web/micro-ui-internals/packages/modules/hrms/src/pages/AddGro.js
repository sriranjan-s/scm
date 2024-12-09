import { Toast, Loader } from "@upyog/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AddOffice = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  const [departments, setDepartments] = useState(window.Digit.SessionStorage.get("initData").tenants || []);
  const [department, setDepartment] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mobile, setMobile] = useState("");
  const [officeHead, setOfficeHead] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("Active");
  const [userType, setUserType] = useState("GRO User");
  const [groOfficerName, setGroOfficerName] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationDetails, setLocationDetails] = useState({
    subDistrict: "",
    district: "",
    state: "",
  });

  const fetchLocationDetails = async () => {
    setError("");
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
      const data = await response.json();

      if (data[0]?.Status === "Success") {
        const { Block: subDistrict, District: district, State: state } =
          data[0].PostOffice[0];
        setLocationDetails({ subDistrict, district, state });
      } else {
        setError("Invalid PIN code or data not available.");
      }
    } catch (err) {
      console.error("Error fetching location details:", err);
      setError("Failed to fetch location details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  

    const payload = {
      department,
      officeName,
      role,
      email,
      telephone,
      mobile,
      officeHead,
      address,
      pinCode,
      location,
      state,
      userType,
      groOfficerName,
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
            "designation": "DESIG_01"
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
                        "code": "EMPLOYEE",
                        "name": "Employee",
                        "labelKey": "ACCESSCONTROL_ROLES_ROLES_EMPLOYEE",
                        "tenantId": department
                    },
                    {
                        "code": "GRO",
                        "name": "Grievance Routing Officer",
                        "labelKey": "ACCESSCONTROL_ROLES_ROLES_GRO",
                        "tenantId": department
                    }
                ]
            }
        ],
          user: {
            mobileNumber: mobile,
            name: officeHead,
            correspondenceAddress: address,
            emailId: email,
            gender: "MALE",
            dob: 507254400000,
            roles:[
                {
                    "code": "EMPLOYEE",
                    "name": "Employee",
                    "labelKey": "ACCESSCONTROL_ROLES_ROLES_EMPLOYEE",
                    "tenantId": department
                },
                {
                    "code": "GRO",
                    "name": "Grievance Routing Officer",
                    "labelKey": "ACCESSCONTROL_ROLES_ROLES_GRO",
                    "tenantId": department
                }
            ],
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
  };

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
      <div className="login-container">
        <div className="login-form">
        <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" }}>Add GRO</h3>
          {showToast && <Toast label="Office added successfully!" />}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Department/Ministry</label>
            <select
              value={department}
              onChange={(e) => {
                const selectedCode = e.target.value;
                setDepartment(selectedCode);
                const selectedDept = departments.find((dept) => dept.code === selectedCode);
                if (selectedDept) {
                  setId(selectedDept.id);
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

            <label>Name of GRO Officer</label>
            <input
              type="text"
              value={groOfficerName}
              onChange={(e) => setGroOfficerName(e.target.value)}
              required
            />

            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="GRO User">GRO User</option>
              <option value="Nodal Appellant Authority">Nodal Appellant Authority</option>
            </select>

            <label>Office/Section Email ID</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Telephone No.</label>
            <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />

            <label>Mobile Number</label>
            <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />

            <label>Office Head Name</label>
            <input type="text" value={officeHead} onChange={(e) => setOfficeHead(e.target.value)} required />

            <label>Office Address Details</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

            <div style={{ marginBottom: "15px" }}>
          <label htmlFor="pinCode">PIN Code:</label>
          <input
            type="text"
            id="pinCode"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            onBlur={fetchLocationDetails}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

  <div>
      <div>
                      <label htmlFor="pinCode">Sub-District:</label>
          <input
            type="text"
            id="pinCode"
            value={locationDetails.subDistrict}
           // onChange={(e) => setPinCode(e.target.value)}
            //={fetchLocationDetails}
            required
          />
      </div>
      <div>
                      <label htmlFor="pinCode">District:</label>
          <input
            type="text"
            id="pinCode"
            value={locationDetails.district}
           // onChange={(e) => setPinCode(e.target.value)}
            //={fetchLocationDetails}
            required
          />
      </div>
      <div>
                      <label htmlFor="pinCode">State:</label>
          <input
            type="text"
            id="pinCode"
            value={locationDetails.state}
           // onChange={(e) => setPinCode(e.target.value)}
            //={fetchLocationDetails}
            required
          />
      </div>
  </div>            <label>Status</label>
            <select value={state} onChange={(e) => setState(e.target.value)} required>
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

export default AddOffice;
