import React, { useEffect } from "react";
import {
  StandaloneSearchBar,
  Loader,
  CardBasedOptions,
  ComplaintIcon,
  PTIcon,
  CaseIcon,
  DropIcon,
  HomeIcon,
  Calender,
  DocumentIcon,
  HelpIcon,
  WhatsNewCard,
  OBPSIcon,
  WSICon,
} from "@upyog/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const user=Digit.UserService?.getUser()?.access_token;
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  let isMobile = window.Digit.Utils.browser.isMobile();
  if(window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE",{})
   
  const conditionsToDisableNotificationCountTrigger = () => {
    if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
    if (!Digit.UserService?.getUser()?.access_token) return false;
    return true;
  };

  const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
    tenantId,
    variant: "whats-new",
    config: {
      enabled: conditionsToDisableNotificationCountTrigger(),
    },
  });

  if (!tenantId) {
    Digit.SessionStorage.get("locale") === null
      //? history.push(`/digit-ui/citizen/select-language`)
      ? history.push(`/digit-ui/citizen/select-location`)
      : history.push(`/digit-ui/citizen/select-location`);
  }

  const appBannerWebObj = uiHomePage?.appBannerDesktop;
  const appBannerMobObj = uiHomePage?.appBannerMobile;
  const citizenServicesObj = uiHomePage?.citizenServicesCard;
  const infoAndUpdatesObj = uiHomePage?.informationAndUpdatesCard;
  const whatsAppBannerWebObj = uiHomePage?.whatsAppBannerDesktop;
  const whatsAppBannerMobObj = uiHomePage?.whatsAppBannerMobile;
  const whatsNewSectionObj = uiHomePage?.whatsNewSection;

  const handleClickOnWhatsAppBanner = (obj) => {
    window.open(obj?.navigationUrl);
  };

  const allCitizenServicesProps = {
    header: t(citizenServicesObj?.headerLabel),
    sideOption: {
      name: t(citizenServicesObj?.sideOption?.name),
      onClick: () => history.push(citizenServicesObj?.sideOption?.navigationUrl),
    },
    options: [
      {
        name: t(citizenServicesObj?.props?.[0]?.label),
        Icon: <ComplaintIcon />,
        onClick: () => history.push(citizenServicesObj?.props?.[0]?.navigationUrl),
      },
      {
        name: t(citizenServicesObj?.props?.[1]?.label),
        Icon: <PTIcon className="fill-path-primary-main" />,
        onClick: () => history.push(citizenServicesObj?.props?.[1]?.navigationUrl),
      },
      {
        name: t(citizenServicesObj?.props?.[2]?.label),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push(citizenServicesObj?.props?.[2]?.navigationUrl),
      },
      // {
      //     name: t("ACTION_TEST_WATER_AND_SEWERAGE"),
      //     Icon: <DropIcon/>,
      //     onClick: () => history.push("/digit-ui/citizen")
      // },
      {
        name: t(citizenServicesObj?.props?.[3]?.label),
        Icon: <WSICon />,
        onClick: () => history.push(citizenServicesObj?.props?.[3]?.navigationUrl),
      },
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  const allInfoAndUpdatesProps = {
    header: t(infoAndUpdatesObj?.headerLabel),
    sideOption: {
      name: t(infoAndUpdatesObj?.sideOption?.name),
      onClick: () => history.push(infoAndUpdatesObj?.sideOption?.navigationUrl),
    },
    options: [
      {
        name: t(infoAndUpdatesObj?.props?.[0]?.label),
        Icon: <HomeIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[0]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[1]?.label),
        Icon: <Calender />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[1]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[2]?.label),
        Icon: <DocumentIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[2]?.navigationUrl),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[3]?.label),
        Icon: <DocumentIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[3]?.navigationUrl),
      },
      // {
      //     name: t("CS_COMMON_HELP"),
      //     Icon: <HelpIcon/>
      // }
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };

  const buttonStyle = {
    backgroundColor: '#fff',
    color: '#FFA500',
    padding: '10px 20px',
    border: '2px solid #FFA500',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px 0',
  };
  
  const actionButtonStyle = {
    backgroundColor: '#FFA500',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };


  return isLoading ? (
    <Loader />
  ) : (
   !user?(
    <div className="HomePageContainer">
      {/* <div className="SideBarStatic">
        <StaticCitizenSideBar />
      </div> */}
      <div className="HomePageWrapper" style={{justifyItems:'center'}}>
        {/* {<div className="BannerWithSearch">
          {isMobile ? <img src={appBannerMobObj?.bannerUrl} /> : <img src={appBannerWebObj?.bannerUrl} />}
           <div className="Search">
            <StandaloneSearchBar placeholder={t("CS_COMMON_SEARCH_PLACEHOLDER")} />
          </div> 
           <div className="ServicesSection">
          <CardBasedOptions style={{marginTop:"-30px"}} {...allCitizenServicesProps} />
          <CardBasedOptions style={isMobile ? {} : {marginTop:"-30px"}} {...allInfoAndUpdatesProps} />
        </div> 
        </div> */}
        <div style={{ display: 'flex', marginTop:"200px" }}>
        <div style={{ display: 'flex', gap: '20px' }}>
       {/* Grievance Card */}
       <div
          style={{
            backgroundColor: '#FFA500',
            borderRadius: '10px',
            padding: '20px',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '350px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
           //justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p1 style={{fontSize:'20px'}}>Grievance</p1>
          <button style={buttonStyle} onClick={(e) => { history.replace("/digit-ui/citizen/pgr/create-complaint/grievance-info")}}>Lodge Grievance</button>
          <button style={buttonStyle}>Grievance Details</button>
          <button style={buttonStyle}>Grievance Status</button>
          <button style={buttonStyle}>Provide Feedback</button>
        </div>

        {/* Appeal Card */}
        <div
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '350px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p1 style={{fontSize:'30px'}}>Appeal</p1>
        </div>
      </div>
     </div>

        {/* {(whatsAppBannerMobObj || whatsAppBannerWebObj) && (
          <div className="WhatsAppBanner">
            {isMobile ? (
              <img src={whatsAppBannerMobObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerMobObj)} />
            ) : (
              <img src={whatsAppBannerWebObj?.bannerUrl} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerWebObj)} />
            )}
          </div>
        )} */}

        {/* {conditionsToDisableNotificationCountTrigger() ? (
          EventsDataLoading ? (
            <Loader />
          ) : (
            <div className="WhatsNewSection">
              <div className="headSection">
                <h2>{t(whatsNewSectionObj?.headerLabel)}</h2>
                <p onClick={() => history.push(whatsNewSectionObj?.sideOption?.navigationUrl)}>{t(whatsNewSectionObj?.sideOption?.name)}</p>
              </div>
              <WhatsNewCard {...EventsData?.[0]} />
            </div>
          )
        ) : null} */}
      </div>
    </div>)
    :(
      <div className="HomePageContainer">
        <div className="HomePageWrapper" style={{justifyItems:'flex-start', marginTop:'60px', marginLeft:'70px'}}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <p1 style={{  fontSize:'40px',fontWeight:'bold', color: '#4f4f82'}}>Grievance Menu</p1>
        
      </div>

      {/* Statistics Section */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        {['5 Total Grievance Registered', '2 Grievance In Process', '3 Grievance Disposed', '1 Grievance In Draft', '0 Notification From Department'].map((text, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#e6f5f4',
              color: '#004d40',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              width: '200px',
            }}
          >
            <h3 style={{ margin: '0' }}>{text}</h3>
          </div>
        ))}
      </div>

      {/* Action Buttons Section */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <button style={actionButtonStyle} onClick={(e) => { history.replace("/digit-ui/citizen/pgr/create-complaint/grievance-info")}}>Lodge Grievance</button>
        <button style={actionButtonStyle} onClick={(e) => { history.replace("/digit-ui/citizen/pgr/complaints")}}>Track Grievance</button>
        <button style={actionButtonStyle}>Provide Feedback</button>
      </div>

      {/* Grievance Table Section */}
      <div style={{ padding: '0 20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <thead style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <tr>
              {['S.No', 'Grievance ID', 'Lodging Date', 'Department Name', 'Category', 'Status', 'Action'].map((header, index) => (
                <th key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'DPOST/E/2024/007273', '27.08.24', 'Department of Posts', 'Speed Post', 'Pending', 'Track Grievance'],
              ['2', 'DPFD/E/2024/007263', '03.08.24', 'Department of Food and Public Distribution', 'International Courier', 'Pending', 'Track Grievance'],
              ['3', 'DOPST/E/2024/007263', '06.07.24', 'Department of Posts', 'Ration Card', 'Disposed', 'Provide Feedback Raise Appeal'],
              ['4', 'DMOLE/E/2024/007263', '16.07.24', 'Department of Labour', 'Wage', 'Disposed', 'Provide Feedback Raise Appeal'],
              ['5', 'DOFIN/E/2024/007263', '03.02.24', 'Department of Finance', 'Banks', 'Closed', 'View Grievance Details'],
            ].map((row, index) => (
              <tr key={index}>
                {row.map((data, dataIndex) => (
                  <td key={dataIndex} style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: dataIndex === 5 ? 'center' : 'left' }}>
                    {dataIndex === 5 ? (
                      <span style={{ color: data === 'Pending' ? 'red' : data === 'Disposed' ? 'green' : '#000' }}>{data}</span>
                    ) : data}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    )
  );
};

export default Home;
