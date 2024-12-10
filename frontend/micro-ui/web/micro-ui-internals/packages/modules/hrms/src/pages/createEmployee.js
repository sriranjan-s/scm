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

  const onSubmit = (data) => {
    if (data.Jurisdictions.filter(juris => juris.tenantId == tenantId).length == 0) {
      setShowToast({ key: true, label: "ERR_BASE_TENANT_MANDATORY" });
      return;
    }
    if (!Object.values(data.Jurisdictions.reduce((acc, sum) => {
      if (sum && sum?.tenantId) {
        acc[sum.tenantId] = acc[sum.tenantId] ? acc[sum.tenantId] + 1 : 1;
      }
      return acc;
    }, {})).every(s => s == 1)) {
      setShowToast({ key: true, label: "ERR_INVALID_JURISDICTION" });
      return;
    }
    let roles = data?.Jurisdictions?.map((ele) => {
      return ele.roles?.map((item) => {
        item["tenantId"] = ele.boundary;
        return item;
      });
    });

    const mappedroles = [].concat.apply([], roles);
    let Employees = [
      {
        "tenantId": "pg",
        "code": "pg.health",
        "name": headName,
        "description": "fgsg gdsg ",
        "hod": null,
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
    /* use customiseCreateFormData hook to make some chnages to the Employee object */
    Employees = Digit?.Customizations?.HRMS?.customiseCreateFormData ? Digit.Customizations.HRMS.customiseCreateFormData(data, Employees) : Employees;

    if (data?.SelectEmployeeId?.code && data?.SelectEmployeeId?.code?.trim().length > 0) {
      Digit.HRMSService.search(tenantId, null, { codes: data?.SelectEmployeeId?.code }).then((result, err) => {
        if (result.Employees.length > 0) {
          setShowToast({ key: true, label: "ERR_HRMS_USER_EXIST_ID" });
          return;
        } else {
          navigateToAcknowledgement(Employees);
        }
      });
    } else {
      navigateToAcknowledgement(Employees);
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
    let organizations = [
      {
            "tenantId": "pg",
            "code": department,
            "name": headName,
            "description": "",
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
    console.log("employee", organizations)
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
                `}
        </style>
<div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="login-form" style={{ width: "100%", padding: "0 5%" }}>
        <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" }}>
          Add Organization
        </h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="department" style={{ color: "#23316b" }}>
            Department/Ministry
          </label>
          <select
  id="department"
  value={department}
  onChange={(e) => {
    setDepartment(e.target.value.code)
    setHeadName(e.target.value.name)
  }}
  required
  style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
>
  <option value="">Select Department/Ministry</option>
  {dept?.map((dep) => (
    <option key={dep?.code} value={dep}>
      {dep?.name}
    </option>
  ))}
</select>
          <label htmlFor="email" style={{ color: "#23316b" }}>
            Department/Ministry Email ID
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />


            <div>
              <label htmlFor="department" style={{ color: "#23316b", display: "block" }}>
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
                {dept?.map((dep) => (
                  <option key={dep?.code} value={dep?.code}>
                    {dep?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid-container half-width">
              <div>
                <label htmlFor="email" style={{ color: "#23316b" }}>
                  Department/Ministry Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />
              </div>
              <div>
                <label htmlFor="telephone" style={{ color: "#23316b" }}>
                  Telephone Number
                </label>
                <input
                  type="tel"
                  id="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="headName" style={{ color: "#23316b" }}>
                Department/Ministry Head Name
              </label>
              <input
                type="text"
                id="headName"
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              />
            </div>
            <div className="grid-container full-width">
              <label htmlFor="address" style={{ color: "#23316b" }}>
                Department/Ministry Address Details
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows="3"
                style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              ></textarea>
            </div>
            <div className="grid-container half-width" >
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
              <label htmlFor="status" style={{ color: "#23316b" }}>
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className="submit-button"
              style={{
                backgroundColor: "#23316b",
                color: "white",
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateEmployee;
