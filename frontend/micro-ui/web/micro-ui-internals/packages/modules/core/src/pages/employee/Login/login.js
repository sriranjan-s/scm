import { BackButton, Dropdown, FormComposerNew, Loader, Toast } from "@upyog/digit-ui-react-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../../components/Background";
import Header from "../../../components/Header";

/* set employee details to enable backward compatiable */
const setEmployeeDetail = (userObject, token) => {
  let locale = JSON.parse(sessionStorage.getItem("Digit.locale"))?.value || "en_IN";
  localStorage.setItem("Employee.tenant-id", userObject?.tenantId);
  localStorage.setItem("tenant-id", userObject?.tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Employee.locale", locale);
  localStorage.setItem("token", token);
  localStorage.setItem("Employee.token", token);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Employee.user-info", JSON.stringify(userObject));
};

const Login = ({ config: propsConfig, t, isDisabled }) => {
  const { data: cities, isLoading } = Digit.Hooks.useTenants();
  const { data: storeData, isLoading: isStoreLoading } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [disable, setDisable] = useState(false);

  const history = useHistory();
  // const getUserType = () => "EMPLOYEE" || Digit.UserService.getType();
  let   sourceUrl = "https://s3.ap-south-1.amazonaws.com/egov-qa-assets";
  const pdfUrl = "https://pg-egov-assets.s3.ap-south-1.amazonaws.com/Upyog+Code+and+Copyright+License_v1.pdf";
  
  useEffect(() => {
    if (!user) {
      return;
    }
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    const filteredRoles = user?.info?.roles?.filter((role) => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
    if (user?.info?.roles?.length > 0) user.info.roles = filteredRoles;
    Digit.UserService.setUser(user);
    setEmployeeDetail(user?.info, user?.access_token);
    let redirectPath = "/digit-ui/employee";

    /* logic to redirect back to same screen where we left off  */
    if (window?.location?.href?.includes("from=")) {
      redirectPath = decodeURIComponent(window?.location?.href?.split("from=")?.[1]) || "/digit-ui/employee";
    }

    /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
    if (user?.info?.roles && user?.info?.roles?.length > 0 &&  user?.info?.roles?.every((e) => e.code === "NATADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/NURT_DASHBOARD";
    }
    /*  RAIN-6489 Logic to navigate to National DSS home incase user has only one role [NATADMIN]*/
    if (user?.info?.roles && user?.info?.roles?.length > 0 && user?.info?.roles?.every((e) => e.code === "STADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/home";
    }

    history.replace(redirectPath);
  }, [user]);

  const onLogin = async (data) => {
    if (!data.city) {
      alert("Please Select City!");
      return;
    }
    setDisable(true);

    const requestData = {
      ...data,
      userType: "EMPLOYEE",
    };
    requestData.tenantId = data.city.code;
    delete requestData.city;
    try {
      const { UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);
      Digit.SessionStorage.set("Employee.tenantId", info?.tenantId);
      setUser({ info, ...tokens });
    } catch (err) {
      setShowToast(err?.response?.data?.error_description || "Invalid login credentials!");
      setTimeout(closeToast, 5000);
    }
   // setDisable(false);
  };

  const closeToast = () => {
    setShowToast(null);
  };

  const onForgotPassword = () => {
    sessionStorage.getItem("User") && sessionStorage.removeItem("User")
    history.push("/digit-ui/employee/user/forgot-password");
  };

  const [userId, password, city] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(userId.label),
          type: userId.type,
          populators: {
            name: userId.name,
          },
          isMandatory: true,
        },
        {
          label: t(password.label),
          type: password.type,
          populators: {
            name: password.name,
          },
          isMandatory: true,
        },
        {
          label: t(city.label),
          type: city.type,
          populators: {
            name: city.name,
            customProps: {},
            component: (props, customProps) => (
              <Dropdown
                option={cities}
                className="login-city-dd"
                optionKey="i18nKey"
                select={(d) => {
                  props.onChange(d);
                }}
                t={t}
                style={{borderRadius:"10px",marginTop:"5px",backgroundColor: "White",color:"black",height:"2.5rem !important"}}
                {...customProps}
              />
            ),
          },
          isMandatory: true,
        },
      ],
    },
  ];

  return isLoading || isStoreLoading ? (
    <Loader />
  ) : (
    <Background style={{display:"flex", alignItems:"flex-start !important"}}>
      <div className="employeeBackbuttonAlign">
        <BackButton variant="white" style={{ borderBottom: "none" }} />
      </div>

      <FormComposerNew
        onSubmit={onLogin}
        isDisabled={isDisabled || disable}
        noBoxShadow
        inline
        submitInForm
        config={config}
        label={propsConfig.texts.submitButtonLabel}
        secondaryActionLabel={propsConfig.texts.secondaryButtonLabel}
        onSecondayActionClick={onForgotPassword}
        heading={propsConfig.texts.header}
        headingStyle={{ textAlign: "center" }}
        cardStyle={{ margin: "auto", minWidth: "408px",borderRadius:"20px" }}
        className="loginFormStyleEmployee"
        buttonStyle={{ maxWidth: "100%", width: "100%" ,backgroundColor:"#5a1166",borderRadius:"20px"}}
      >
       <div style={{display:"flex",padding:"15px",justifyContent:"center"}}>
          <div>
      <img className="city" src="https://pgportal.gov.in/Images/iconHome/logo.png" alt="City Logo" />
      </div>
      <div>
    {/* <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",letterSpacing:"1px" }}>
      <span style={{fontWeight:"bold", display:"flex", flexDirection:"column", marginLeft:"20px", color:"#0e338a", fontSize:"20px"}} className="logoText">
        विदेश मंत्रालय
        <span style={{fontWeight:"normal", color:"black", fontSize:"18px",display:"flex",flexDirection:"column"}} className="logoTextSubline"> MINISTRY OF <span style={{fontWeight:"bold"}}>EXTERNAL AFFAIRS</span></span>
      </span>
      </span> */}
      </div>
      </div>
        {/* <Header /> */}
      </FormComposerNew>
      {showToast && <Toast error={true} label={t(showToast)} onClose={closeToast} />}
      <div
        style={{
          backgroundColor: '#23316b',
          color: 'white',
          textAlign: 'center',
          padding: '10px 0',
          position: 'relative',
          bottom: '0',
          width: '100%',
          marginTop: '130px',
        }}
      >
        <footer>
          <p>An initiative by Department of Administrative Reforms & Public Grievances (DARPG)</p>
          <p>Disclaimer | Website Policies | Web Information Manager</p>
        </footer>
      </div>
    </Background>
  );
};

Login.propTypes = {
  loginParams: PropTypes.any,
};

Login.defaultProps = {
  loginParams: null,
};

export default Login;
