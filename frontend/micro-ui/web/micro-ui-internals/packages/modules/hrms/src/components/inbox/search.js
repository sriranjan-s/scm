import { ActionBar, CloseSvg, DatePicker, Label, LinkLabel, SubmitBar, TextInput } from "@upyog/digit-ui-react-components";
import React,{useState} from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SearchApplication = ({ onSearch,seacrhEmployee,type, onClose, searchFields, searchParams, isInboxPage, defaultSearchParams }) => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState(window.Digit.SessionStorage.get("initData").tenants);
  const [department, setDepartment] = useState("");
  const { register, handleSubmit, reset, watch, control } = useForm({
    defaultValues: searchParams,
  });
  const mobileView = innerWidth <= 640;
  const onSubmitInput = (data) => {
    if (!data.mobileNumber) {
      delete data.mobileNumber;
    }
    data.delete = [];
    searchFields.forEach((field) => {
      if (!data[field.name]) data.delete.push(field.name);
    });
    onSearch(data);
    if (type === "mobile") {
      onClose();
    }
  };
  const handleSubmitNew=()=>{
  
    if(window.location.href.includes("gro"))
    {
      seacrhEmployee({code:"GRO",tenantId:department})
     
    }
    else if (window.location.href.includes("nodal"))
    {
      seacrhEmployee({code:"NODAL_ADMIN",tenantId:department})
     
    }
   
  }

  function clearSearch() {
    const resetValues = searchFields.reduce((acc, field) => ({ ...acc, [field?.name]: "" }), {});
    reset(resetValues);
    const _newParams = { ...searchParams };
    _newParams.delete = [];
    searchFields.forEach((e) => {
      _newParams.delete.push(e?.name);
    });
    onSearch({ ..._newParams });
  }

  const clearAll = (mobileView) => {
    const mobileViewStyles = mobileView ? { margin: 0 } : {};
    return (
      <LinkLabel style={{ display: "inline", ...mobileViewStyles }} onClick={clearSearch}>
        {t("HR_COMMON_CLEAR_SEARCH")}
      </LinkLabel>
    );
  };

  return (
    <form onSubmit={handleSubmitNew}>
      <style>
        {
          `
          .dropdown-container {
            position: relative;
            display: inline-block;
            width: 100%;
          }
          
          #department {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #d32f2f; /* Red border like the image */
            border-radius: 4px;
            font-size: 16px;
            background-color: white;
            color: #333;
            outline: none;
            appearance: none;
            cursor: pointer;
          }
          
          #department:focus {
            border-color: #4caf50; /* Optional green focus border */
          }
          
          #department option {
            padding: 10px;
            font-size: 14px;
            background-color: white;
            color: #333;
          }
          
          .dropdown-icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            pointer-events: none;
            color: #333;
            font-size: 20px;
          }
          
          `
        }
      </style>
      <React.Fragment>
        <div className="search-container" style={{ width: "auto", marginLeft: isInboxPage ? "24px" : "revert" }}>
          <div className="search-complaint-container">
            {(type === "mobile" || mobileView) && (
              <div className="complaint-header" style={{ display: 'flex', justifyContent: "space-between" }}>
                <h2>{t("ES_COMMON_SEARCH_BY")}</h2>
                <span onClick={onClose}>
                  <CloseSvg />
                </span>
              </div>
            )}
            <div className="" style={{ width: "100%" }}>
            <div className="dropdown-container">
  <Label>Department/Ministry</Label>
  <select
    id="department"
    value={department}
    onChange={(e) => {
      const selectedCode = e.target.value;
      setDepartment(selectedCode);

      const selectedDept = departments.find((dept) => dept.code === selectedCode);
      // if (selectedDept) {
      //   setStateuser(selectedDept.state);
      // }
    }}
    required
  >
    <option value="">Select Department/Ministry</option>
    {departments.map((dept) => (
      <option key={dept.code} value={dept.code}>
        {dept.i18nKey}
      </option>
    ))}
  </select>
  <div className="dropdown-icon">▼</div>
</div>

            </div>
            <div className="inbox-action-container">
              {type === "desktop" && !mobileView && (
                <span style={{ paddingTop: "9px" }} className="clear-search">
                  {clearAll()}
                </span>
              )}
              {type === "desktop" && !mobileView && (
                <SubmitBar
                  style={{ marginTop: "unset" }}
                  className="submit-bar-search"
                  label={t("ES_COMMON_SEARCH")}
                  submit
                />
              )}
            </div>
          </div>
        </div>
        {(type === "mobile" || mobileView) && (
          <ActionBar className="clear-search-container">
            <button className="clear-search" style={{ flex: 1 }}>
              {clearAll(mobileView)}
            </button>
            <SubmitBar label={t("HR_COMMON_SEARCH")} style={{ flex: 1 }} submit={true} />
          </ActionBar>
        )}
      </React.Fragment>
    </form>
  );
};

export default SearchApplication;
