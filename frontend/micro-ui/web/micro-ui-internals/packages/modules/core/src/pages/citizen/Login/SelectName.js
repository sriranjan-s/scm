import React, { useState,useEffect } from "react";
import { FormStep } from "@upyog/digit-ui-react-components";

const setCitizenDetail = (userObject, token, tenantId) => {
  let locale = JSON.parse(sessionStorage.getItem("Digit.initData"))?.value?.selectedLanguage;
  localStorage.setItem("Citizen.tenant-id", tenantId);
  localStorage.setItem("tenant-id", tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Citizen.locale", locale);
  localStorage.setItem("token", token);
  localStorage.setItem("Citizen.token", token);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Citizen.user-info", JSON.stringify(userObject));
};
const SelectName = ({ config, onSelect, t, isDisabled }) => {
  const [citizenStatus, setCitizenStatus] = useState(""); // State for radio button
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nameIndian, setNameIndian] = useState("");
  const [pincode, setpincodeIndian] = useState("");
  const [district, setDistrictIndian] = useState("");
  const [state, setStateIndian] = useState("");
  const [userId, setuserIdIndian] = useState("");
  const [passwordIndian, setPasswordIndian] = useState("");
  const [securityCodeIndian, setSecurityCodeIndian] = useState("");
  const [otpIndian, setOtpIndian] = useState("");
  const [otp, setOtp] = useState("");
  const [Verification, setVerification] = useState(false)
  const [securityCode, setSecurityCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const recaptchaSiteKey = "6Le8FJAqAAAAACD58T3If7VBrBmoeWmCPB8XllSa";
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");
  const TYPE_REGISTER = { type: "register" };
  const TYPE_LOGIN = { type: "login" };
  const DEFAULT_USER = "digit-user";
  const DEFAULT_REDIRECT_URL = "/digit-ui/citizen/home";
  const getUserType = () => Digit.UserService.getType();
  const handleCitizenStatusChange = (event) => {
    setCitizenStatus(event.target.value);
    setVerification(true)
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile(); // Check on initial render
    window.addEventListener("resize", checkIfMobile); // Check on window resize

    return () => {
      window.removeEventListener("resize", checkIfMobile); // Cleanup
    };
  }, []);
  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const handleVerify = (event) => {
    event.preventDefault()
    if (userInput === captcha) {
      alert("Captcha Verified!");
      setCaptcha(generateCaptcha()); // Generate a new CAPTCHA on success
      setUserInput(""); // Clear the input field
      setVerified(true)
    } else {
      alert("Captcha does not match. Try again!");
      setUserInput(""); // Clear the input field
    }
  };
  
  const handleOtpSendNRI = async() => {
    if (email) {
      // Simulate sending OTP
      console.log(`OTP sent to ${email}`,mobileNumber);
      const data = {
        mobileNumber:email,
        tenantId: "pg",
        userType: getUserType(),
      };
  
        const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_REGISTER } });
      setOtpSent(true);
      alert("OTP sent to your email address.");
    } else {
      alert("Please enter your email address first.");
    }
  };
  const handleOtpSend = async() => {
    if (email || mobileNumber) {
      // Simulate sending OTP
      console.log(`OTP sent to ${email}`,mobileNumber);
      const data = {
        mobileNumber:mobileNumber,
        tenantId: "pg",
        userType: getUserType(),
      };
  
        const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_REGISTER } });
      setOtpSent(true);
      alert("OTP sent to your email address.");
    } else {
      alert("Please enter your email address first.");
    }
  };
  const sendOtp = async (data) => {
    console.log("datadata",data)
    try {
      const res = await Digit.UserService.sendOtp(data, "pg");
      return [res, null];
    } catch (err) {
      return [null, err];
    }
  };
  const handleSubmitNri =async  (event) => {
    event.preventDefault();
    console.log({ name, email, otp, securityCode });
    const requestData = {
        "otpReference": otpIndian,
        "username": email,
        "password": null,
        "mobileNumber": mobileNumber,
        "name": nameIndian,
        "emailId": email,
        "passportNo": null,
        "tenantId": "pg",
        "permanentCity": "pg"
    };
    const { ResponseInfo, UserRequest: info, ...tokens } = await Digit.UserService.registerUser(requestData, "pg");
    alert("Form submitted successfully!");
  };
  const handleSubmit =async  (event) => {
    event.preventDefault();
    console.log({ name, email, otp, securityCode });
    const requestData = {
        "otpReference": otpIndian,
        "username": userId,
        "password": passwordIndian,
        "mobileNumber": mobileNumber,
        "name": nameIndian,
        "emailId": null,
        "passportNo": null,
        "tenantId": "pg",
        "permanentCity": "pg"
    };
    const { ResponseInfo, UserRequest: info, ...tokens } = await Digit.UserService.registerUser(requestData, "pg");
    setUser({ info, ...tokens });
    alert("Form submitted successfully!");
  };
  useEffect(() => {
    console.log("useruser",user)
    if (!user) {
      return;
    }
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    Digit.UserService.setUser(user);
    setCitizenDetail(user?.info, user?.access_token, "pg");
    const redirectPath = location.state?.from || DEFAULT_REDIRECT_URL;
    if (!Digit.ULBService.getCitizenCurrentTenant(true)) {
      history.replace("/digit-ui/citizen/select-location", {
        redirectBackTo: redirectPath,
      });
    } else {
      history.replace(redirectPath);
    }
  }, [user]);
  const handleVerification = (event) => {
    event.preventDefault();
    setVerification(false)

  }
  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setVerified(!!value); // If value exists, CAPTCHA is completed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
                
                h3 {
                    text-align: center;
                }
                
                .radio-container {
                    text-align: center;
                    margin: 20px 0;
                }

                .or-divider {
                    text-align: center;
                    margin: 20px 0;
                    font-weight: bold;
                }

                .social-login {
                    text-align: center;
                    margin: 20px 0;
                }

                .social-button {
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  padding: 10px 15px;
                  margin-bottom: 10px;
                  background-color: white;
                  border: 1px solid #ccc;
                  border-radius: 25px;
                  cursor: pointer;
                  width: 70%;
                  margin: 10px auto;
                  text-align: left;
                  font-weight: bold;
                  color: #23316b;
                  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              
              .social-button:hover {
                  background-color: #f0f0f0;
                  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2);
              }

                .social-button svg, 
                .social-button img {
                    margin-right: 15px;
                    width: 24px;
                    height: 24px;
                }

                .social-button:hover {
                    background-color: #e0e0e0;
                }

                .submit-button {
                    display: block;
                    width: 50%;
                    margin: 20px auto;
                    background-color: #23316b;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 10px;
                    cursor: pointer;
                }

                .submit-button:hover {
                    background-color: #1a2749;
                }
                `}
      </style>
      <div className="login-container" style={{ display: "flex", height: "calc(100vh - 188px)",alignItems:"center",gap:'20px' }}>
        {!isMobile &&(
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%"
          }}>
            <img
              src="https://i.postimg.cc/430X0ZWk/india-republic-day-posterflyerbannerfree-photos-background-539191-41962-removebg.png"
              style={{ width: "60%", height: "60%", backgroundColor: "#23316b", borderRadius: "20px" }}
            />
          </div>
        )}       
        
        {citizenStatus == "" && <div className="login-form" style={{ marginTop:"20px", marginLeft:"20px", paddingLeft: "5%", paddingRight: "5%" }}>
          <h3 style={{ fontSize: "x-Large", color: "#23316b", fontWeight: "bolder" }}>Sign Up</h3>
          <form>
            <div className="radio-container">
              <p style={{ color: "#23316b" }}>Whether you are a citizen of India or an NRI?</p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
                <div style={{ width: "100px" }}>
                  <input
                    style={{ height: "15px", width: "15px" }}
                    type="radio"
                    id="citizen"
                    name="citizenStatus"
                    value="Indian"
                    checked={citizenStatus === "Indian"}
                    onChange={handleCitizenStatusChange}
                    required
                  />
                  <label htmlFor="citizen" style={{ paddingLeft: "10px" }}>Indian</label>
                </div>
                <div style={{ width: "100px" }}>
                  <input
                    style={{ height: "15px", width: "15px" }}
                    type="radio"
                    id="nri"
                    name="citizenStatus"
                    value="NRI"
                    checked={citizenStatus === "NRI"}
                    onChange={handleCitizenStatusChange}
                    required
                  />
                  <label htmlFor="nri" style={{ paddingLeft: "10px" }}>NRI</label>
                </div>
              </div>
            </div>

            <div className="or-divider">OR</div>

            <div className="social-login">
              <button type="button" className="social-button">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  alt="Facebook Icon"
                />
                Sign Up with Facebook
              </button>

              <button type="button" className="social-button">
                <svg
                  version="1.1"
                  id="Layer_1"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="#23316b"
                >
                  <path
                    d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  
                                        l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z 
                                        M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  
                                        l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"
                  />
                </svg>
                Sign Up with X
              </button>
            </div>
            <p style={{ textAlign: "center", color: "#23316b" }}>Already have an account ?</p>
            <button type="submit" className="submit-button">Sign In</button>
          </form>
        </div>}


        {citizenStatus === "NRI" && (
          <div className="login-section" style={{  }}>
            <style>
              {`    

                  

                    h3 {
                        text-align: center;
                    }

                    label {
                        display: block;
                        margin: 10px 0 5px;
                        font-weight: bold;
                        color: #23316b;
                    }

                    input {
                        width: calc(100% - 20px);
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 16px;
                    }

                    .otp-container {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    button {
                        background-color: #23316b;
                        color: white;
                        padding: 10px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    }

                    button:hover {
                        background-color: #1a2749;
                    }

                    .submit-button {
                        display: block;
                        width: 100%;
                        margin: 20px auto;
                    }
                `}
            </style>
            <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" , marginTop:'30px'}}>
              Registration Form
            </h3>
            <form onSubmit={handleSubmitNri} style={{width:'80%', marginLeft:'30px'}}>
              <div className="input-group">
                <label htmlFor="name">Enter Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Enter Email ID:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group otp-container">
                <div style={{ flex: "1" }}>
                  <label htmlFor="otp">Enter OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    disabled={!otpSent}
                  />
                </div>
                <button type="button" onClick={handleOtpSendNRI}>
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </button>
              </div>

              <div className="input-group">
                <label htmlFor="securityCode">Enter Security Code:</label>
                <input
                  type="text"
                  id="securityCode"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        )}
        {citizenStatus === "Indian" && Verification && (
          <div className="login-section" style={{  }}>
            <style>
              {`                  

                    h3 {
                        text-align: center;
                    }

                    label {
                        display: block;
                        margin: 10px 0 5px;
                        font-weight: bold;
                        color: #23316b;
                    }

                    input {
                        width: calc(100% - 20px);
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 16px;
                    }

                    .otp-container {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    button {
                        background-color: #23316b;
                        color: white;
                        padding: 10px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    }

                    button:hover {
                        background-color: #1a2749;
                    }

                    .submit-button {
                        display: block;
                        width: 100%;
                        margin: 20px auto;
                    }
                `}
            </style>
            <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder", marginTop:'30px' }}>
              Verification
            </h3>
            <form onSubmit={handleSubmit} style={{width:'80%', marginLeft:'30px'}}> 
              <div className="input-group">
                <label htmlFor="name">Enter Mobile Number:</label>
                <input
                  type="text"
                  id="name"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>

              <div className="input-group otp-container">
                <div style={{ flex: "1" }}>
                  <label htmlFor="otp">Enter OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    value={otpIndian}
                    onChange={(e) => setOtpIndian(e.target.value)}
                    required
                    disabled={!otpSent}
                  />
                </div>
                <button type="button" onClick={handleOtpSend}>
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </button>
              </div>

              {/* <div className="input-group">
                            <label htmlFor="securityCode">Enter Security Code:</label>
                            <input
                                type="text"
                                id="securityCode"
                                value={securityCode}
                                onChange={(e) => setSecurityCode(e.target.value)}
                                required
                            />
                        </div> */}

              <button type="submit" className="submit-button" onClick={handleVerification}>
                Next
              </button>
            </form>
          </div>
        )}
        {citizenStatus === "Indian" && !Verification && (
          <div className="login-section" style={{ }}>
            <style>
              {`         

                    h3 {
                        text-align: center;
                    }

                    label {
                        display: block;
                        margin: 10px 0 5px;
                        font-weight: bold;
                        color: #23316b;
                    }

                    input {
                        width: calc(100% - 20px);
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 16px;
                    }

                    .otp-container {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    button {
                        background-color: #23316b;
                        color: white;
                        padding: 10px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    }

                    button:hover {
                        background-color: #1a2749;
                    }

                    .submit-button {
                        display: block;
                        width: 100%;
                        margin: 20px auto;
                    }
                `}
            </style>
            <h3 style={{ fontSize: "large", color: "#23316b", fontWeight: "bolder" , marginTop:'110px'}}>
              Registration Form
            </h3>
            <form onSubmit={handleSubmit} style={{width:'80%', marginLeft:'30px'}}>
              <div className="input-group">
                <label htmlFor="name">Enter Name</label>
                <input
                  type="text"
                  id="name"
                  value={nameIndian}
                  onChange={(e) => setNameIndian(e.target.value)}
                  required
                />
              </div>

              <div className="input-group otp-container">
                <div style={{ flex: "1" }}>
                  <label htmlFor="otp">Enter Pincode:</label>
                  <input
                    type="text"
                    id="name"
                    value={pincode}
                    onChange={(e) => setpincodeIndian(e.target.value)}
                    required
                  />
                </div>
                {/* <button type="button" onClick={handleOtpSend}>
                                {otpSent ? "Resend OTP" : "Send OTP"}
                            </button> */}
              </div>
              <div style={{ display: "flex" }}>
                <div className="input-group" style={{ width: "50%" }}>
                  <label htmlFor="name">District</label>
                  <input
                    type="text"
                    id="name"
                    value={district}
                    onChange={(e) => setDistrictIndian(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group" style={{ width: "50%" }}>
                  <label htmlFor="name">State</label>
                  <input
                    type="text"
                    id="name"
                    value={state}
                    onChange={(e) => setStateIndian(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="input-group" style={{ width: "50%" }}>
                  <label htmlFor="name">Username</label>
                  <input
                    type="text"
                    id="name"
                    value={userId}
                    onChange={(e) => setuserIdIndian(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group" style={{ width: "50%" }}>
                  <label htmlFor="name">Password</label>
                  <input
                    type="text"
                    id="name"
                    value={passwordIndian}
                    onChange={(e) => setPasswordIndian(e.target.value)}
                    required
                  />
                </div>
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
                    }}
                  >
                    {captcha}
                  </div>
                  <div style={{ marginTop: "10px", width: "25%" }}>
                    <button onClick={handleVerify} style={{ padding: "10px 20px", fontSize: "16px" }}>
                      Verify
                    </button>
                  </div>
                </div>

              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>

              </div>
              <button
                type="submit"
                disabled={!verified}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: verified ? "#4CAF50" : "#ccc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: verified ? "pointer" : "not-allowed",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectName;
