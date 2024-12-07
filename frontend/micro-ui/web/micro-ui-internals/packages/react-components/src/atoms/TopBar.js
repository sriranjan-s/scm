import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Hamburger from "./Hamburger";
import { NotificationBell } from "./svgindex";
import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";

const TopBar = ({
  img,
  isMobile,
  logoUrl,
  onLogout,
  toggleSidebar,
  ulb,
  userDetails,
  notificationCount,
  notificationCountLoaded,
  cityOfCitizenShownBesideLogo,
  onNotificationIconClick,
  hideNotificationIconOnSomeUrlsWhenNotLoggedIn,
  changeLanguage,
}) => {
  const { pathname } = useLocation();

  // const showHaburgerorBackButton = () => {
  //   if (pathname === "/digit-ui/citizen" || pathname === "/digit-ui/citizen/" || pathname === "/digit-ui/citizen/select-language") {
  //     return <Hamburger handleClick={toggleSidebar} />;
  //   } else {
  //     return <BackButton className="top-back-btn" />;
  //   }
  // };
  return (
    <div className="">
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
            </div>
    </div>
  );
};

TopBar.propTypes = {
  img: PropTypes.string,
};

TopBar.defaultProps = {
  img: undefined,
};

export default TopBar;
