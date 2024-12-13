import React, { Fragment, useState } from "react";
import { ArrowRightInbox } from "./svgindex";
import { Link } from "react-router-dom";

// const EmployeeModuleCard = ({ Icon, moduleName, kpis = [], links = [], isCitizen = false, className, styles, longModuleName=false, FsmHideCount }) => {
//   return (
//     <div className={className ? className : "employeeCard customEmployeeCard card-home home-action-cards"} style={styles ? styles : {}}>
//       <div className="complaint-links-container">
//         <div className="header" style={isCitizen ? { padding: "0px" } : longModuleName ? {alignItems:"flex-start"}:{}}>
//           <span className="text removeHeight">{moduleName}</span>
//           <span className="logo removeBorderRadiusLogo">{Icon}</span>
//         </div>
//         <div className="body" style={{ margin: "0px", padding: "0px" }}>
//           {kpis.length !== 0 && (
//             <div className="flex-fit" style={isCitizen ? { paddingLeft: "17px" } : {}}>
//               {kpis.map(({ count, label, link }, index) => (
//                 <div className="card-count" key={index}>
//                   <div>
//                     <span>{count ? count : count == 0 ? 0 : "-"}</span>
//                   </div>
//                   <div>
//                     {link ? (
//                       <Link to={link} className="employeeTotalLink">
//                         {label}
//                       </Link>
//                     ) : null}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="links-wrapper" style={{ width: "80%" }}>
//             {links.map(({ count, label, link }, index) => (
//               <span className="link" key={index}>
//                 {link ? <Link to={link}>{label}</Link> : null}
//                 {count ? (
//                   <>
//                     {FsmHideCount ? null : <span className={"inbox-total"}>{count || "-"}</span>}
//                     <Link to={link}>
//                       <ArrowRightInbox />
//                     </Link>
//                   </>
//                 ) : null}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const EmployeeModuleCard = ({ Icon, moduleName, kpis = [], links = [], isCitizen = false, className, styles, longModuleName = false, FsmHideCount }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div style={{
      position: 'relative',
      display: "inline-grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      overflow: 'hidden',
      width: '320px',
      height: '290px',
      backgroundColor: isHovered ? '#e6e6e6' : '#23316b',
      boxShadow: isHovered
        ? '0px 10px 20px rgba(0, 0, 0, 0.10)'
        : '0px 5px 15px rgba(0, 0, 0, 0.4)',
      borderRadius: '15px',
      transition: 'height 0.3s ease, text-shadow 0.3s ease',
      ...styles,
      marginTop: "45px",
      marginRight: "25px"
    }}
      className="employee-module-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="complaint-links-container" style={{ height: "100%", backgroundColor: isHovered ? '#e6e6e6' : '#23316b' }}>
        <div className="header"
          style={{
            padding: isCitizen ? "0px" : "20px",
            alignItems: longModuleName ? "flex-start" : "center",
            textAlign: "center",
            transition: "top 0.3s ease",
            position: "absolute",
            top: isHovered ? '0' : '35%',
            left: "40%",
            transform: "translate(-50%)",
            width: "100%",
            zIndex: 10,
            marginTop: isHovered ? "8px" : "0px",
            marginBottom: isHovered ? "14px" : "0px",
            border: "none",
            color: isHovered ? "black" : "white",
          }}>
          <span className="text removeHeight">{moduleName}</span>
          <span className="logo removeBorderRadiusLogo" style={{ marginLeft: "5px" }}>{Icon}</span>
        </div>
        <div className="body"
          style={{
            margin: "0px",
            padding: "0px",
            opacity: isHovered ? 1 : 0,
            visibility: isHovered ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
            height: "100%",
            position: "absolute",
            top: isHovered ? '60px' : '50%',
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "auto",
            padding: '20px',
            marginTop: "10px"
          }}>
          {kpis.length !== 0 && (
            <div className="flex-fit" style={isCitizen ? { paddingLeft: "17px" } : {}}>
              {kpis.map(({ count, label, link }, index) => (
                <div className="card-count" key={index}>
                  <div>
                    <span>{count ? count : count == 0 ? 0 : "-"}</span>
                  </div>
                  <div>
                    {link ? (
                      <Link to={link} className="employeeTotalLink">
                        {label}
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="links-wrapper" style={{ width: "90%" }}>
            {links.map(({ count, label, link }, index) => (
              <span className="link" key={index} style={{ borderTop: "1.5px solid #F26562", paddingTop: "3px", margin: "1px" }}>
                {link ? <Link to={link}>{label}</Link> : null}
                {count ? (
                  <>
                    {FsmHideCount ? null : <span className={"inbox-total"}>{count || "-"}</span>}
                    <Link to={link}>
                      <ArrowRightInbox />
                    </Link>
                  </>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModuleCardFullWidth = ({ moduleName, links = [], isCitizen = false, className, styles, headerStyle, subHeader, subHeaderLink }) => {
  return (
    <div className={className ? className : "employeeCard card-home customEmployeeCard home-action-cards"} style={styles ? styles : {}}>
      <div className="complaint-links-container" style={{ padding: "10px" }}>
        <div className="header" style={isCitizen ? { padding: "0px" } : headerStyle}>
          <span className="text removeHeight">{moduleName}</span>
          <span className="link">
            <a href={subHeaderLink}>
              <span className={"inbox-total"} style={{ display: "flex", alignItems: "center", color: "#F47738", fontWeight: "bold" }}>
                {subHeader || "-"}
                <span style={{ marginLeft: "10px" }}>
                  {" "}
                  <ArrowRightInbox />
                </span>
              </span>
            </a>
          </span>
        </div>
        <div className="body" style={{ margin: "0px", padding: "0px" }}>
          <div className="links-wrapper" style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {links.map(({ count, label, link }, index) => (
              <span className="link full-employee-card-link" key={index}>
                {link ? (link?.includes('digit-ui/') ? <Link to={link}>{label}</Link> : <a href={link}>{label}</a>) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmployeeModuleCard, ModuleCardFullWidth };
