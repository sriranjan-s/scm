import { FormComposer, Toast, Loader, Header } from "@upyog/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { newConfig } from "../components/config/config";

const CreateEmployee = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [canSubmit, setSubmitValve] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [phonecheck, setPhonecheck] = useState(false);
  const [checkfield, setcheck] = useState(false)
  const [departmentDropdown, setDepartmentDropdown] = useState(window.Digit.SessionStorage.get("initData").departments || []);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("")
  const [hod, setHod] = useState("")
  const [telephone, setTelephone] = useState("");
  const [headName, setHeadName] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [status, setStatus] = useState("Active");
  const [dept, setDept] = useState([]);
  const [locationDetails, setLocationDetails] = useState({
    subDistrict: "",
    district: "",
    state: "",
  });
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  const isMobile = window.Digit.Utils.browser.isMobile();
  //const Department =  window.Digit.SessionStorage.get("departments");
  const { data: mdmsData, isLoading } = Digit.Hooks.useCommonMDMS(Digit.ULBService.getStateId(), "egov-hrms", ["CommonFieldsConfig"], {
    select: (data) => {
      return {
        config: data?.MdmsRes?.['egov-hrms']?.CommonFieldsConfig
      };
    },
    retry: false,
    enable: false,
  });
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_HRMS_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_HRMS_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_HRMS_MUTATION_SUCCESS_DATA", false);

  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  useEffect(() => {
    setDept(departmentDropdown)
    console.log("deptdept33", dept, departmentDropdown)
  }, [departmentDropdown])
  const checkMailNameNum = (formData) => {

    const email = formData?.SelectEmployeeEmailId?.emailId || '';
    const name = formData?.SelectEmployeeName?.employeeName || '';
    const address = formData?.SelectEmployeeCorrespondenceAddress?.correspondenceAddress || '';
    const validEmail = email.length == 0 ? true : email.match(Digit.Utils.getPattern('Email'));
    return validEmail && name.match(Digit.Utils.getPattern('Name')) && address.match(Digit.Utils.getPattern('Address'));
  }
  useEffect(() => {
    if (mobileNumber && mobileNumber.length == 10 && mobileNumber.match(Digit.Utils.getPattern('MobileNo'))) {
      setShowToast(null);
      Digit.HRMSService.search(tenantId, null, { phone: mobileNumber }).then((result, err) => {
        if (result.Employees.length > 0) {
          setShowToast({ key: true, label: "ERR_HRMS_USER_EXIST_MOB" });
          setPhonecheck(false);
        } else {
          setPhonecheck(true);
        }
      });
    } else {
      setPhonecheck(false);
    }
  }, [mobileNumber]);

  const defaultValues = {

    Jurisdictions:
      [{
        id: undefined,
        key: 1,
        hierarchy: null,
        boundaryType: null,
        boundary: {
          code: tenantId
        },
        roles: [],
      }]
  }


  const onFormValueChange = (setValue = true, formData) => {
    if (formData?.SelectEmployeePhoneNumber?.mobileNumber) {
      setMobileNumber(formData?.SelectEmployeePhoneNumber?.mobileNumber);
    } else {
      setMobileNumber(formData?.SelectEmployeePhoneNumber?.mobileNumber);
    }
    for (let i = 0; i < formData?.Jurisdictions?.length; i++) {
      let key = formData?.Jurisdictions[i];
      if (!(key?.boundary && key?.boundaryType && key?.hierarchy && key?.tenantId && key?.roles?.length > 0)) {
        setcheck(false);
        break;
      } else {
        setcheck(true);
      }
    }

    let setassigncheck = false;
    for (let i = 0; i < formData?.Assignments?.length; i++) {
      let key = formData?.Assignments[i];
      if (
        !(key.department && key.designation && key.fromDate && (formData?.Assignments[i].toDate || formData?.Assignments[i]?.isCurrentAssignment))
      ) {
        setassigncheck = false;
        break;
      } else if (formData?.Assignments[i].toDate == null && formData?.Assignments[i]?.isCurrentAssignment == false) {
        setassigncheck = false;
        break;
      } else {
        setassigncheck = true;
      }
    }
    if (
      formData?.SelectDateofEmployment?.dateOfAppointment &&
      formData?.SelectEmployeeCorrespondenceAddress?.correspondenceAddress &&
      formData?.SelectEmployeeGender?.gender.code &&
      formData?.SelectEmployeeName?.employeeName &&
      formData?.SelectEmployeeType?.code &&
      formData?.SelectEmployeePhoneNumber?.mobileNumber &&
      checkfield &&
      setassigncheck &&
      phonecheck &&
      checkMailNameNum(formData)
    ) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };

  const navigateToAcknowledgement = (organizations) => {
    history.replace("/digit-ui/employee/hrms/response", { organizations });
  }
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
  if (isLoading) {
    return <Loader />;
  }
  const config = mdmsData?.config ? mdmsData.config : newConfig;
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      department,
      email,
      telephone,
      headName,
      address,
      pinCode,
      status,
    });
    const matchedDept = departmentDropdown.find(
      (dept) => dept.code === department
    );

    let organizations = [
      {
            "tenantId": "pg",
            "code": department,
            "name": headName,
            "description": matchedDept?.description,
            "hod": hod,
            "emailId": email,
            "telephoneNumber": telephone,
            "address": address,
            "district": locationDetails?.district,
            "subDistrict": locationDetails?.subDistrict,
            "state": locationDetails?.state,
            "pin": pinCode,
            "status": "ACTIVE"

      },
    ];

    navigateToAcknowledgement(organizations)
  }
  console.log("deptdept", dept)
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

    h4 {
      color: #23316b;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
      font-weight: bold;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* Two fields per row */
      gap: 16px;
    }

    .form-group {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 15px;
    }

    label {
      flex: 0.3; /* Label takes up 30% of the width */
      text-align: right;
      font-weight: bold;
      color: #23316b;
    }

    input, select, textarea {
      flex: 1; /* Input takes the remaining space */
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .card {
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      max-width:none;
    }

    button {
      background-color: #23316b;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 300px;
      margin: 20px auto;
      display: block;
    }

    button:hover {
      background-color: #1e2749;
    }

    @media screen and (max-width: 768px) {
      .grid-container {
        grid-template-columns: 1fr; /* Single column layout for mobile */
      }

      .form-group {
        flex-direction: column;
        align-items: flex-start;
      }

      label {
        width: 100%; 
        text-align: left; 
      }

      input, select, textarea {
        width: 100%; 
      }

      button {
        width: 100%; 
      }
    }

    @media screen and (max-width: 480px) {
      .grid-container {
        grid-template-columns: 1fr; /* Ensure single column for very small screens */
      }

      .form-group {
        flex-direction: column; 
      }

      label {
        width: 100%; 
        font-size: 14px; 
      }

      input, select, textarea {
        width: 100%; 
        font-size: 14px; 
      }

      button {
        width: 100%; 
        padding: 12px; 
      }
    }
  `}
</style>

<div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <div className="login-form" style={{ width: "100%", padding: "0 5%" }}>
    <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" }}>Add Organization</h3>
    <form onSubmit={handleSubmit}>
      
      {/* Basic Details Card */}
      <div className="card">
        <h4>Basic Details</h4>
        <div className="grid-container">
          {/* Department Dropdown */}
          <div className="form-group">
            <label htmlFor="department">Department/Ministry</label>
            <select
              id="department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                const matchedDept = departmentDropdown.find((dept) => dept.code === e.target.value);
                setHeadName(matchedDept?.name || "");
              }}
              style={{width:"50%"}}
              required
            >
              <option value="">Select Department/Ministry</option>
              {dept?.map((dep) => (
                <option key={dep?.code} value={dep?.code}>
                  {dep?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Head Name */}
          <div className="form-group">
            <label htmlFor="headName">Head Name</label>
            <input type="text" id="headName" value={headName} onChange={(e) => setHeadName(e.target.value)} required />
          </div>
        </div>


      {/* Contact Details Card */}

        <h4>Contact Details</h4>
        <div className="grid-container">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="telephone">Telephone</label>
            <input type="tel" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows="3" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="pinCode">PIN Code</label>
            <input type="text" id="pinCode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} onBlur={fetchLocationDetails} required />
          </div>
        </div>

        <div className="grid-container">
          <div className="form-group">
            <label>Sub-District</label>
            <input type="text" value={locationDetails.subDistrict} readOnly />
          </div>
          <div className="form-group">
            <label>District</label>
            <input type="text" value={locationDetails.district} readOnly />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" value={locationDetails.state} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button type="submit">Save</button>
    </form>
  </div>
</div>




    </div>
  );
};
export default CreateEmployee;
