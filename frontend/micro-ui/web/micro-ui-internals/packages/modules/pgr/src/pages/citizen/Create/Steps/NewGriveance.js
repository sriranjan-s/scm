import { Toast, Loader } from "@upyog/digit-ui-react-components";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewGrievance = () => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [fields, setFields] = useState([]);
    const [grievanceText, setGrievanceText] = useState("");
    const [formData, setFormData] = useState({
      category: null,
      subCategory: null,
      dynamicFields: {},
      grievanceText: "",
    });
    const { t } = useTranslation();
    const [fieldOptions, setFieldOptions] = useState({});
    const maxChars = 2000;
  
    // Fetch service definitions
    let serviceDefs = Digit.Hooks.pgr.useServiceDefs("pg.telecom", "PGR");
    let inputFields = Digit.Hooks.pgr.useInputDefs("pg.telecom", "PGR");
  
    useEffect(() => {
      if (selectedCategory) {
        const filteredSubCategories = serviceDefs?.filter(
          (service) => service.parent == selectedCategory
        );
        setSubCategories(filteredSubCategories || []);
        setFormData((prev) => ({
          ...prev,
          category: serviceDefs.find((cat) => cat.id === selectedCategory),
        }));
      }
    }, [selectedCategory, serviceDefs]);
  
    useEffect(() => {
      if (selectedSubCategory) {
        const matchingFields = inputFields.InputFields.filter(
          (field) => field.code === selectedSubCategory
        );
        setFields(matchingFields);
        setFormData((prev) => ({
          ...prev,
          subCategory: subCategories.find(
            (sub) => sub.fieldCode === selectedSubCategory
          ),
        }));
      }
    }, [selectedSubCategory]);
  
    const handleCategoryChange = (event) => {
      const selectedCategoryId = event.target.value;
      setSelectedCategory(selectedCategoryId);
    };
  
    const handleSubCategoryChange = (event) => {
      const selectedSubCategoryId = event.target.value;
      setSelectedSubCategory(selectedSubCategoryId);
    };
  
    const handleGrievanceChange = (event) => {
      const value = event.target.value;
      const regex = /^[A-Za-z0-9.,\-_\(\)\/:&@#$%&*\?+=!'"\s]*$/;
      if (regex.test(value) && value.length <= maxChars) {
        setGrievanceText(value);
        setFormData((prev) => ({
          ...prev,
          grievanceText: value,
        }));
      }
    };
  
    const handleFieldChange = (fieldName, value) => {
        setFormData((prev) => ({
          ...prev,
          dynamicFields: { ...prev.dynamicFields, [fieldName]: value },
        }));
      };
  
    const handleSubmit = () => {
      console.log("Submitted Form Data: ", formData);
      history.push(`/digit-ui/citizen/pgr/create-complaint/griveanceDetails/${name}`,{  data: formData });
    };
  
    const categories = serviceDefs?.filter((service) => service.stage == 2) || [];
    const handleAddOption = (fieldName, newOption) => {
        if (newOption.trim()) {
          setFieldOptions((prev) => ({
            ...prev,
            [fieldName]: [...(prev[fieldName] || []), newOption],
          }));
          handleFieldChange(fieldName, newOption); // Update the form data
        }
      };
    const renderField = (field) => {
        const options = fieldOptions[field.fieldName] || field.options || [];
      
        switch (field.fieldType) {
          case "Textbox":
            return (
              <div key={field.id}>
                <label>{field.displayLable}</label>
                <input
                  type="text"
                  placeholder={field.displayLable}
                  required={field.isMandatory}
                  minLength={field.minDataLength}
                  maxLength={field.maxDataLength}
                  onChange={(e) => handleFieldChange(field.fieldName, e.target.value)}
                />
              </div>
            );
          case "Dropdown":
            return (
              <div key={field.id}>
                <label>{field.displayLable}</label>
                <select
                  required={field.isMandatory}
                  onChange={(e) => handleFieldChange(field.fieldName, e.target.value)}
                >
                  <option value="">{`Select ${field.displayLable}`}</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                  <input
                    type="text"
                    placeholder={`Add new ${field.displayLable}`}
                    onChange={(e) => setFieldOptions((prev) => ({ ...prev, tempOption: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddOption(field.fieldName, fieldOptions.tempOption)}
                    style={{ marginLeft: "10px" }}
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          default:
            return null;
        }
      };
      
      
  
    if (!serviceDefs || serviceDefs.length === 0) {
      return <Loader />;
    }
  
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
            .char-counter {
              font-size: 12px;
              color: #6c757d;
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
          `}
        </style>
  
        <div className="form-container">
          <h3 style={{ fontSize: "x-large", color: "#23316b", fontWeight: "bolder" }}>New Grievance</h3>
          <label>Main Category</label>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">Select Main Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.serviceCode}
              </option>
            ))}
          </select>
  
          {subCategories.length > 0 && (
            <Fragment>
              <label>Sub Category</label>
              <select onChange={handleSubCategoryChange}>
                <option value="">Select Sub Category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.fieldCode}>
                    {subCategory.serviceCode}
                  </option>
                ))}
              </select>
            </Fragment>
          )}
  
          {fields.length > 0 && (
            <div>

              {fields.map((field) => renderField(field))}
            </div>
          )}
  
          <div>
            <label>Text of Grievance (Remarks)</label>
            <span className="char-counter">
              Maximum 2000 characters are allowed in description.{" "}
              {maxChars - grievanceText.length} characters remaining. <br />
              Only A-Z, a-z, 0-9, and special characters , . - _ ( ) / : & @ # $ %
              & * ? + = ! ' " are allowed.
            </span>
            <textarea
              value={grievanceText}
              onChange={handleGrievanceChange}
              placeholder="Enter grievance description here..."
            />
          </div>
  
          <button type="button" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default NewGrievance;
  
