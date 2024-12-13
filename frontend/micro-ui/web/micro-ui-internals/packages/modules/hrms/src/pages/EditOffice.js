import { Toast, Loader } from "@upyog/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";

const EditOffice = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  const [departments, setDepartments] = useState(window.Digit.SessionStorage.get("initData").tenants || []);
  const [department, setDepartment] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [telephone, setTelephone] = useState("");
  const [officeHead, setOfficeHead] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [state, setState] = useState("Active");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [formData, setFormData] =useState(location?.state?.department)
  const [matchingObject,setMatchingObject] = useState("")
  const [locationDetails, setLocationDetails] = useState({
    subDistrict: "",
    district: "",
    state: "",
  });

  const fetchLocationDetails = async () => {
    setError("");
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pinCode}` // Replace with an actual API if needed
      );
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
    if (!telephone.match(/^\d{10}$/)) {
      setError("Invalid telephone number!");
      return;
    }

    const payload = {
      department,
      officeName,
      role,
      email,
      telephone,
      officeHead,
      address,
      pinCode,
      location,
      state,
      tenantId,
    };
    let offices = [
      {
        "tenantId": "pg",
        "organizationId": matchingObject?.id,
        "id":matchingObject?.id,
        "code": formData?.code,
        "name": officeName,
        "description": "Office1",
        "emailId": email,
        "telephoneNumber": telephone,
        "HeadOfficeCode": null,
        "officeAddress": address,
        "district": locationDetails?.district,
        "subDistrict": "subD",
        "state": locationDetails?.state,
        "pin": pinCode,
        "status": state,
        "headOffice": true
      }
    ];
    navigateToAcknowledgement(offices);

  };
  const navigateToAcknowledgement = (offices) => {
    history.replace("/digit-ui/employee/hrms/response", { offices, key: "officeUpdate" });
  }
  useEffect(() => {
    if (formData) {
        const baseCode = formData.code.split('.').slice(0, 2).join('.');
        const matchingObject = departments.find(item => item.code === baseCode);
        console.log("baseCode",baseCode,matchingObject)
        setMatchingObject(matchingObject)
        setDepartment(matchingObject?.i18nKey)
        setEmail(formData?.emailId)
        setOfficeName(formData?.name)
        setState(formData?.state)
        setTelephone(formData?.telephoneNumber)
        setPinCode(formData?.pin)
        setAddress(formData?.officeAddress)
        setOfficeHead(formData?.name)
        let locationDet = {
            subDistrict: formData?.subDistrict,
            district: formData?.district,
            state: formData?.state,
          }
           setLocationDetails(locationDet)
        //   const matchedDept = departmentDropdown.find(
        //     (dept) => dept.code === formData.code
        //   );
        //  console.log("matchedDept",matchedDept,formData.i18nKey,departmentDropdown)
         // setDepartment(matchedDept.name)
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
          .submit-button {
            display: block;
            width: 50%;
            margin: 20px auto;
        }
        `}
      </style>
      <div
        className="login-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div className="login-form" style={{ width: "100%", padding: "0 5%" }}>
          <h3
            style={{
              fontSize: "x-large",
              color: "#23316b",
              fontWeight: "bolder",
              marginBottom: "25px"
            }}
          >
            Add Office
          </h3>
          {showToast && <Toast label="Office added successfully!" />}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="grid-container">
            <div>
              <label>Department/Ministry</label>

              <input
                  type="text"
                  id="department"
                  value={department}
                 disabled
                  required
                  style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />
            </div>
            <div className="grid-container half-width">
              <div>
                <label>Name of Office/Section</label>
                <input
                  type="text"
                  value={officeName}
                  onChange={(e) => setOfficeName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="GRO User">GRO User</option>
                  <option value="Nodal Appellant Authority">
                    Nodal Appellant Authority
                  </option>
                </select>
              </div>
              <div>
                <label>Office/Section Email ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Telephone No.</label>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Office Head Name</label>
                <input
                  type="text"
                  value={officeHead}
                  onChange={(e) => setOfficeHead(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Office Address Details</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Pin Code</label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => {
                    setPinCode(e.target.value);

                  }}
                  onBlur={fetchLocationDetails}
                  maxLength={6}
                  required
                />
              </div>
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
            </div>
            <div>
              <label>Status</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" className="submit-button"
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

export default EditOffice;
