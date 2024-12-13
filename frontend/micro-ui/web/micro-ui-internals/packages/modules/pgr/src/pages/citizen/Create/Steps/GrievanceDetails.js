import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory, useRouteMatch, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComplaint } from "../../../../redux/actions/index";
import { PGR_CITIZEN_COMPLAINT_CONFIG, PGR_CITIZEN_CREATE_COMPLAINT } from "../../../../constants/Citizen";
import Response from "../Response";
import { useQueryClient } from "react-query";
const PersonalDetailsForm = () => {
    const location = useLocation();
    const match = useRouteMatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        country: "",
        state: "",
        district: "",
        address: "",
        pincode: "",
        email: "",
        mobileNumber: "",
        isExServiceman: null,
    });
    const dispatch = useDispatch();
    const client = useQueryClient();
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userInput, setUserInput] = useState("");
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    //console.log("location", location)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            isExServiceman: event.target.value === "yes",
        }));
    };
    const handleVerifyCaptcha = (event) => {
        event.preventDefault();
        if (userInput === captcha) {
            setIsCaptchaVerified(true);
            setCaptcha(generateCaptcha()); // Generate a new CAPTCHA on success
            //setUserInput(""); // Clear the input field
        } else {
            alert("Captcha does not match. Try again!");
            setUserInput(""); // Clear the input field
        }
    };
    const handleSubmit = async () => {
        let value = location.state.data;
        console.log("Submitted Form Data: ", formData, location.state.data);
    
        const data = {
            complaintType: value.subCategory.serviceCode,
            city: formData.state,
            prioritylevel: "LOW",
            description: value?.grievanceText,
            district: formData?.district,
            region: formData.state,
            localityName: formData.address,
            state: formData.state,
            uploadedImages: null,
            cityCode:"pg.telecom",
            additionalDetail: {
                ...formData, // Spread all fields from formData
                ...value,    // Spread all fields from value
            },
        };
    
        console.log("datadatadata", data);
    
        await dispatch(createComplaint(data));
        //Uncomment the following lines if needed
        await client.refetchQueries(["complaintsList"]);
        history.push(`/digit-ui/citizen/pgr/create-complaint/response`);
    };
    
    function generateCaptcha() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    return (
        <div>
            <style>
                {`
          .form-container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          label {
            display: block;
            margin-bottom: 5px;
          }
          input, select, textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .radio-group {
            margin-bottom: 15px;
          }
          .radio-group label {
            display: inline-block;
            margin-right: 10px;
          }
          .confirmation-text {
            font-size: 14px;
            color: #333;
            margin-top: 10px;
          }
          button {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #218838;
          }
        `}
            </style>
            <div className="form-container">
                <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" }}>
                    Personal and Communication Details
                </h3>

                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                />

                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label>Country</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter your country"
                />

                <label>State</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter your state"
                />

                <label>District</label>
                <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Enter your district"
                />

                <label>Address</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                ></textarea>

                <label>Pincode</label>
                <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter your pincode"
                />

                <label>Email ID</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email ID"
                />

                <label>Mobile Number</label>
                <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                />

                <div className="radio-group">
                    <label>Are you an ex-serviceman?</label>
                    <label>
                        <input
                            type="radio"
                            name="isExServiceman"
                            value="yes"
                            onChange={handleRadioChange}
                            checked={formData.isExServiceman === true}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isExServiceman"
                            value="no"
                            onChange={handleRadioChange}
                            checked={formData.isExServiceman === false}
                        />
                        No
                    </label>
                </div>
                <div className="input-group" style={{ width: "100%" }}>
                    <label htmlFor="name">Security Code</label>
                    <div style={{ display: "flex" }}>
                        <div style={{ marginTop: "10px", width: "50%" }}>
                            <input
                                type="text"
                                placeholder="Enter CAPTCHA"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}

                            />
                        </div>
                        <div
                            style={{
                                padding: "10px",
                                fontSize: "24px",
                                fontFamily: "monospace",
                                letterSpacing: "3px",
                                width: "20%"
                            }}
                        >
                            {captcha}
                        </div>
                        <div style={{ marginTop: "10px", width: "25%" }}>
                            <button onClick={handleVerifyCaptcha} style={{ padding: "10px 20px", fontSize: "16px", width: "100%" }}>
                                Verify
                            </button>
                        </div>
                    </div>

                </div>
                <div>
    <span className="confirmation-text">
        I hereby state that the facts mentioned above are true to the best of my knowledge and belief.
    </span>
</div>
<button 
    type="button" 
    onClick={handleSubmit} 
    disabled={!isCaptchaVerified} 
    style={{
        padding: "10px 20px",
        backgroundColor: isCaptchaVerified ? "#28a745" : "#ccc",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: isCaptchaVerified ? "pointer" : "not-allowed",
    }}
>
    Submit
</button>

            </div>
        </div>
    );
};

export default PersonalDetailsForm;
