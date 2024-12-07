import { Dropdown, Hamburger, TopBar as TopBarComponent } from "@upyog/digit-ui-react-components";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import ChangeCity from "../ChangeCity";
import ChangeLanguage from "../ChangeLanguage";

const TextToImg = (props) => (
  <span className="user-img-txt" onClick={props.toggleMenu} title={props.name}>
    {props?.name?.[0]?.toUpperCase()}
  </span>
);
const TopBar = ({
  t,
  stateInfo,
  toggleSidebar,
  isSidebarOpen,
  handleLogout,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  userOptions,
  handleUserDropdownSelection,
  logoUrl,
  showLanguageChange = true,
  setSideBarScrollTop,
}) => {
  const [profilePic, setProfilePic] = React.useState(null);

  React.useEffect(async () => {
    const tenant = Digit.ULBService.getCurrentTenantId();
    const uuid = userDetails?.info?.uuid;
    if (uuid) {
      const usersResponse = await Digit.UserService.userSearch(tenant, { uuid: [uuid] }, {});
      if (usersResponse && usersResponse.user && usersResponse.user.length) {
        const userDetails = usersResponse.user[0];
        const thumbs = userDetails?.photo?.split(",");
        setProfilePic(thumbs?.at(0));
      }
    }
  }, [profilePic !== null, userDetails?.info?.uuid]);

  const CitizenHomePageTenantId = Digit.ULBService.getCitizenCurrentTenant(true);

  let history = useHistory();
  const { pathname } = useLocation();

  const conditionsToDisableNotificationCountTrigger = () => {
    if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
    if (Digit.UserService?.getUser()?.info?.type === "CITIZEN") {
      if (!CitizenHomePageTenantId) return false;
      else return true;
    }
    return false;
  };

  const { data: { unreadCount: unreadNotificationCount } = {}, isSuccess: notificationCountLoaded } = Digit.Hooks.useNotificationCount({
    tenantId: CitizenHomePageTenantId,
    config: {
      enabled: conditionsToDisableNotificationCountTrigger(),
    },
  });

  const updateSidebar = () => {
    if (!Digit.clikOusideFired) {
      toggleSidebar(true);
      setSideBarScrollTop(true);
    } else {
      Digit.clikOusideFired = false;
    }
  };

  function onNotificationIconClick() {
    history.push("/digit-ui/citizen/engagement/notifications");
  }

  const urlsToDisableNotificationIcon = (pathname) =>
    !!Digit.UserService?.getUser()?.access_token
      ? false
      : ["/digit-ui/citizen/login", "/digit-ui/citizen/select-location"].includes(pathname);

  if (CITIZEN) {
    return (
      <div>
        <TopBarComponent
          img={stateInfo?.logoUrlWhite}
          isMobile={true}
          toggleSidebar={updateSidebar}
          logoUrl={stateInfo?.logoUrlWhite}
          onLogout={handleLogout}
          userDetails={userDetails}
          notificationCount={unreadNotificationCount < 99 ? unreadNotificationCount : 99}
          notificationCountLoaded={notificationCountLoaded}
          cityOfCitizenShownBesideLogo={t(CitizenHomePageTenantId)}
          onNotificationIconClick={onNotificationIconClick}
          hideNotificationIconOnSomeUrlsWhenNotLoggedIn={urlsToDisableNotificationIcon(pathname)}
          changeLanguage={!mobileView ? <ChangeLanguage dropdown={true} /> : null}
        />
      </div>
    );
  }
  const loggedin = userDetails?.access_token ? true : false;
  return (
    <div className="topbar" style={{padding:"0px"}}>
      {/* {mobileView ? <Hamburger handleClick={toggleSidebar} color="#9E9E9E" /> : null}
      <img className="city" src={loggedin ? cityDetails?.logoId : stateInfo?.statelogo} />
      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        {loggedin &&
          (cityDetails?.city?.ulbGrade ? (
            <p className="ulb" style={mobileView ? { fontSize: "14px", display: "inline-block" } : {}}>
              {t(cityDetails?.i18nKey).toUpperCase()}{" "}
              {t(`ULBGRADE_${cityDetails?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`).toUpperCase()}
            </p>
          ) : (
            <img className="state" src={logoUrl} />
          ))}
        {!loggedin && (
          <p className="ulb" style={mobileView ? { fontSize: "14px", display: "inline-block" } : {}}>
            {t(`MYCITY_${stateInfo?.code?.toUpperCase()}_LABEL`)} {t(`MYCITY_STATECODE_LABEL`)}
          </p>
        )}
        {!mobileView && (
          <div className={mobileView ? "right" : "flex-right right w-80 column-gap-15"} style={!loggedin ? { width: "80%" } : {}}>
            <div className="left">
              {!window.location.href.includes("employee/user/login") && !window.location.href.includes("employee/user/language-selection") && (
                <ChangeCity dropdown={true} t={t} />
              )}
            </div>
            <div className="left">{showLanguageChange && <ChangeLanguage dropdown={true} />}</div>
            {userDetails?.access_token && (
              <div className="left">
                <Dropdown
                  option={userOptions}
                  optionKey={"name"}
                  select={handleUserDropdownSelection}
                  showArrow={true}
                  freeze={true}
                  style={mobileView ? { right: 0 } : {}}
                  optionCardStyles={{ overflow: "revert" }}
                  customSelector={
                    profilePic == null ? (
                      <TextToImg name={userDetails?.info?.name || userDetails?.info?.userInfo?.name || "Employee"} />
                    ) : (
                      <img src={profilePic} style={{ height: "48px", width: "48px", borderRadius: "50%" }} />
                    )
                  }
                />
              </div>
            )}
            <img className="state" src={logoUrl} />
          </div>
        )}
      </span> */}
    <div className="" style={{width:"100%"}}>
      {/* <div className="center-container back-wrapper">
        <div className="hambuger-back-wrapper">
          {isMobile && <Hamburger handleClick={toggleSidebar} />}
          <a href={window.location.href.includes("citizen")?"/digit-ui/citizen":"/digit-ui/employee"}><img
            className="city"
            id="topbar-logo"
            src={img || "https://cdn.jsdelivr.net/npm/@egovernments/digit-ui-css@1.0.7/img/m_seva_white_logo.png"}
            alt="mSeva"
          />
          </a>
          <h3>{cityOfCitizenShownBesideLogo}</h3>
        </div>

        <div className="RightMostTopBarOptions">
          {!hideNotificationIconOnSomeUrlsWhenNotLoggedIn ? changeLanguage : null}
          {!hideNotificationIconOnSomeUrlsWhenNotLoggedIn ? (
            <div className="EventNotificationWrapper" onClick={onNotificationIconClick}>
              {notificationCountLoaded && notificationCount ? (
                <span>
                  <p>{notificationCount}</p>
                </span>
              ) : null}
              <NotificationBell />
            </div>
          ) : null}
        </div>
      </div> */}
       {/* <header className="header">
                <img src="logo.png" alt="Logo" className="logo" />
                <h1>NextGen CPGRAMS</h1>
                <h2>DEPARTMENT OF ADMINISTRATIVE REFORMS & PUBLIC GRIEVANCES</h2>
            </header> */}
            <div className="topHeader" style={{height:"30px",backgroundColor:"#23316b"}}>

            </div>
            <div className="middleHeader"style={{height:"70px",backgroundColor:"white",display:"flex"}}>
<div style={{height:"70px",paddingLeft:"15px"}}>
  <img src="https://pgportal.gov.in/Images/iconHome/logo.png" style={{width:"190px", verticalAlign:"middle",height:"inherit"}}></img>
</div>
<div style={{width:"100%",marginLeft:"-190px", fontSize:"xx-large",textAlign:"center",fontWeight:"bolder",color:"#23316b",display:"flex",justifyContent:"center",alignItems:"center"}}>
<h1>NextGen CPGRAMS</h1>
</div>
            </div>
            <div className="lowerHeader"style={{height:"30px",backgroundColor:"#23316b",color:"white",display:"flex",   justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: "25%",
    paddingRight: "25%"}}>
<span> Home </span> <span> About Us </span> <span>Redressal Process</span> <span>Officer List</span> <span> FAQs/Help </span>
{userDetails?.access_token && (
              <div className="left">
                <Dropdown
                  option={userOptions}
                  optionKey={"name"}
                  select={handleUserDropdownSelection}
                  showArrow={true}
                  freeze={true}
                  style={mobileView ? { right: 0 } : {}}
                  optionCardStyles={{ overflow: "revert" }}
                  customSelector={
                    profilePic == null ? (
                     <span>Logout</span>
                    ) : (
                      <img src={profilePic} style={{ height: "48px", width: "48px", borderRadius: "50%" }} />
                    )
                  }
                />
              </div>
            )}
            </div>
    </div>
    </div>
  );
};

export default TopBar;
