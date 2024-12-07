import { Toast, Loader } from "@upyog/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AddOffice = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [officeHead, setOfficeHead] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("Active");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationDetails, setLocationDetails] = useState({
    subDistrict: "",
    district: "",
    state: "",
  });

  // Fetch departments for dropdown
//   useEffect(() => {
//     setIsLoading(true);
//     Digit.HRMSService.getDepartments(tenantId).then((data) => {
//       setDepartments(data || []);
//       setIsLoading(false);
//     });
//   }, []);

  // Fetch location details based on PIN code
//   const fetchLocationDetails = (pin) => {
//     if (pin.length === 6) {
//       Digit.LocationService.getLocation(pin).then((data) => {
//         setLocation(data);
//       });
//     }
//   };
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

    // Save Office details
    Digit.HRMSService.addOffice(payload).then((response) => {
      if (response.status === "success") {
        setShowToast(true);
        setTimeout(() => history.push("/offices"), 2000);
      } else {
        setError("Failed to save Office details!");
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
            }}
          >
            Add Office
          </h3>
          {showToast && <Toast label="Office added successfully!" />}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Department/Ministry</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department/Ministry</option>
              {departments.map((dept) => (
                <option key={dept.code} value={dept.code}>
                  {dept.name}
                </option>
              ))}
            </select>

            <label>Name of Office/Section</label>
            <input
              type="text"
              value={officeName}
              onChange={(e) => setOfficeName(e.target.value)}
              required
            />

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

            <label>Office/Section Email ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Telephone No.</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />

            <label>Office Head Name</label>
            <input
              type="text"
              value={officeHead}
              onChange={(e) => setOfficeHead(e.target.value)}
              required
            />

            <label>Office Address Details</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly
            />

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
  </div>

            <label>Status</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
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
