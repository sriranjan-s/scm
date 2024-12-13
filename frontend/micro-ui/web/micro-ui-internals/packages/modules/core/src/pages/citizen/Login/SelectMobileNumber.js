import React, { useState, useEffect } from "react";
import { CardText, FormStep, CitizenConsentForm, Loader, CheckBox,BackButton } from "@upyog/digit-ui-react-components";
import { Link } from "react-router-dom";
import { Route, Switch, useHistory, useRouteMatch, useLocation } from "react-router-dom";
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
const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, onMobileChange, config, canSubmit }) => {
  const location = useLocation();
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const [isCheckBox, setIsCheckBox] = useState(false);
  const [isCCFEnabled, setisCCFEnabled] = useState(false);
  const [mdmsConfig, setMdmsConfig] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [user, setUser] = useState(null);
  const { isLoading, data } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "common-masters", [{ name: "CitizenConsentForm" }]);
  const TYPE_REGISTER = { type: "register" };
  const TYPE_LOGIN = { type: "login" };
  const DEFAULT_USER = "digit-user";
  const DEFAULT_REDIRECT_URL = "/digit-ui/citizen/home";
  //let isMobile = window.Digit.Utils.browser.isMobile();
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
  
  function setTermsAndPolicyDetails(e) {
    setIsCheckBox(e.target.checked)
  }
  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const validateEmailOrPhone = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Valid Indian phone numbers
    return emailRegex.test(input) || phoneRegex.test(input);
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
  const checkDisbaled = () => {
    if (isCCFEnabled?.isCitizenConsentFormEnabled) {
      return !(mobileNumber.length === 10 && canSubmit && isCheckBox)
    } else {
      return !(mobileNumber.length === 10 && canSubmit)
    }
  }
  const getUserType = () => Digit.UserService.getType();
  const handleGetOtp = async() => {
    if (validateEmailOrPhone(userId)) {
      console.log(`OTP sent to: ${userId}`);
      const data = {
        mobileNumber:userId,
        tenantId: "pg",
        userType: getUserType(),
      };
  
        const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_LOGIN } });
      setOtpSent(true);
      alert("OTP sent successfully.");
    } else {
      alert("Enter a valid email or mobile number.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isCaptchaVerified) {
      console.log({ userId, password });
      await selectOtp()
     
    } else {
      alert("Please verify the CAPTCHA.");
    }
  };
  useEffect(() => {
    if (data?.["common-masters"]?.CitizenConsentForm?.[0]?.isCitizenConsentFormEnabled) {
      setisCCFEnabled(data?.["common-masters"]?.CitizenConsentForm?.[0])
    }
  }, [data]);
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
  const onLinkClick = (e) => {
    setMdmsConfig(e.target.id)
  }
  const sendOtp = async (data) => {
    console.log("datadata",data)
    try {
      const res = await Digit.UserService.sendOtp(data, "pg");
      return [res, null];
    } catch (err) {
      return [null, err];
    }
  };
  const resendOtp = async () => {
    const { mobileNumber } = params;
    const data = {
      mobileNumber,
      tenantId: "pg",
      userType: getUserType(),
    };
    if (!isUserRegistered) {
      const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_REGISTER } });
    } else if (isUserRegistered) {
      const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_LOGIN } });
    }
  };
  const selectOtp = async () => {
    console.log("fffff")
    try {
        const requestData = {
          username: userId,
          password: password,
          tenantId: "pg",
          userType: getUserType(),
          otp:"Y"
        };
        const { ResponseInfo, UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);

        if (location.state?.role) {
          const roleInfo = info.roles.find((userRole) => userRole.code === location.state.role);
          if (!roleInfo || !roleInfo.code) {
            setError(t("ES_ERROR_USER_NOT_PERMITTED"));
            setTimeout(() => history.replace(DEFAULT_REDIRECT_URL), 5000);
            return;
          }
        }
        if (window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")) {
          info.tenantId = Digit.ULBService.getStateId();
        }

        setUser({ info, ...tokens });
      
    } catch (err) {
      
    }
  };
  if (isLoading) return <Loader />

  return (
    <div>
<       div>
        <BackButton />
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
                `}
        </style>

        <div className="login-container" style={{ display: "flex" , alignItems: "center",gap:'20px'}}>
          {!isMobile && (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    //width: "50%",
                }}
            >
                <img
                    src="https://i.postimg.cc/430X0ZWk/india-republic-day-posterflyerbannerfree-photos-background-539191-41962-removebg.png"
                    style={{
                        width: "60%",
                        height: "70%",
                        backgroundColor: "#23316b",
                        borderRadius: "20px",
                    }}
                    alt="Sign In Poster"
                />
            </div>
            )}

            <div className="login-form" style={{  padding: "0 5%", marginTop:"20px", marginLeft:"20px"}}>
                <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" }}>
                    Sign In
                </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId"  style={{ color: "#23316b" }}>Enter User ID/E-mail ID/Mobile Number</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <div>
        <label htmlFor="password" style={{ color: "#23316b" }}>
                        Enter Password/OTP
                    </label>
          <input
            type="password"
            placeholder="Enter OTP"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!otpSent}
          />
          <button
            type="button"
            className="otp-button"
            onClick={handleGetOtp}
            style={{
              backgroundColor: otpSent ? "#4caf50" : "#23316b",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              flexShrink: 0,
              width: "20%"
          }}
            disabled={!validateEmailOrPhone(userId)}
          >
            {otpSent ? "Resend OTP" : "Get OTP"}
          </button>
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
                      width:"20%"
                    }}
                  >
                    {captcha}
                  </div>
                  <div style={{ marginTop: "10px", width: "25%", marginLeft:"50px" }}>
                    <button onClick={handleVerifyCaptcha} style={{ padding: "10px 20px", fontSize: "16px", width:"100%"}}>
                      Verify
                    </button>
                  </div>
                </div>

              </div>


                    <button
                        type="submit"
                        className="submit-button"
                        disabled={!isCaptchaVerified}
                        style={{
                            backgroundColor: "#23316b",
                            color: "white",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
          Submit
        </button>
      </form>
      <div className="action-buttons" style={{ marginTop: "20px" }}>
                    <button style={{ marginRight: "10px" }}>Recover Account</button>
                    <button onClick={(e) => {e.preventDefault() ; history.push(`/digit-ui/citizen/register/name`,{})}}>Sign Up</button>
                    </div>

                <div className="social-login" style={{ marginTop: "20px", textAlign: "center" }}>
                    <p>Or Sign In with</p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352..."/>
                        </svg>

                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                            alt="Facebook Login"
                            style={{ width: "24px", height: "24px", cursor: "pointer" }}
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SelectMobileNumber;
