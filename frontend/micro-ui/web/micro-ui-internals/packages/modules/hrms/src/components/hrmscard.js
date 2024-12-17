import { PersonIcon, EmployeeModuleCard } from "@upyog/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import Dashboard from "../pages/Dashboard";

const HRMSCard = () => {
  const ADMIN = Digit.Utils.hrmsAccess();
  if (!ADMIN) {
    return null;
  }
  else {
    return <Dashboard></Dashboard>
  }
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const { isLoading, isError, error, data, ...rest } = Digit.Hooks.hrms.useHRMSCount(tenantId);

    const propsForModuleCardUserManagement = {
        Icon : <PersonIcon/>,
        moduleName: t("User Management"),
       
        links: [
            {
                label: t("Add Organization"),
                link: `/digit-ui/employee/hrms/create`
            },
            {
                label: t("View Organization"),
                link: `/digit-ui/employee/hrms/viewOrg`
            },
            {
                label: t("Add Ministry/Department"),
                link: `/digit-ui/employee/hrms/createDepartment`
            },
            {
                label: t("View Ministry/Department"),
                link: `/digit-ui/employee/hrms/inbox/nodal`
            } ,
            {
                label: t("Add Head of Department"),
                link: `/digit-ui/employee/hrms/createHod`
            },
            {
                label: t("View Head of Department"),
                link: `/digit-ui/employee/hrms/inbox/department`
            }            
        ]
    }
    const propsForModuleCardDepartmengt = {
        Icon : <PersonIcon/>,
        moduleName: t("Department/Ministry Nodal"),
       
        links: [
            {
                label: t("Add Office"),
                link: `/digit-ui/employee/hrms/createOffice`
            }  ,
            {
                label: t("View office"),
                link: `/digit-ui/employee/hrms/viewOffice`
            },
            {
                label: t("Add Gro"),
                link: `/digit-ui/employee/hrms/createGro`
            }  ,
            {
                label: t("View Gro"),
                link: `/digit-ui/employee/hrms/inbox/gro`
            }
                     
        ]
    }
    const propsForAppealCard = {
        Icon : <PersonIcon/>,
        moduleName: t("Appellate Officer Dashboard"),
       
        links: [
            {
                label: t("Dashboard"),
                link: `/digit-ui/employee/hrms/appeal-dashboard`
            }        
        ]
    }

    return <div><EmployeeModuleCard {...propsForModuleCardUserManagement} /><EmployeeModuleCard {...propsForModuleCardDepartmengt} /><EmployeeModuleCard {...propsForAppealCard} /></div>
};

export default HRMSCard;

