import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AppealForm = () => {
  const [serviceRequestId, setServiceRequestId] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [applicationNumber, setApplicationNumber] = useState("");
  const [grievanceIdFromResponse, setGrievanceIdFromResponse] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [grievanceData, setGrievanceData] = useState(null);
  const [loadingGrievance, setLoadingGrievance] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId()
  const MAX_COMMENT_LENGTH = 5000;
  const history = useHistory();

  const styles = {
    card: {
      backgroundColor: '#fff',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: '20px auto',
      textAlign: 'center',
    },
    heading: {
      color: '#23316b',
      marginBottom: '20px',
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold"
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#23316b',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      marginBottom: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      backgroundColor: '#23316b',
      color: '#ffffff',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '300px',
      margin: "20px"
    },
    buttonHover: {
      backgroundColor: '#e65c00',
    },
    error: {
      color: 'red',
      marginBottom: '15px',
    },
    success: {
      color: 'green',
    },
    submitButton: {
      display: 'block',
      width: '50%',
      margin: '20px auto',
      textAlign: "center"
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      setLoadingGrievance(true);
      const grievanceResponse = await Digit.PGRService.search(tenantId, { serviceRequestId });
      setGrievanceData(grievanceResponse.data); 
      let lastModifiedTime = grievanceResponse?.ServiceWrappers[0]?.service?.auditDetails?.lastModifiedTime
      let timeNow = Date.now()
      let differenceInDays = (timeNow - lastModifiedTime)/(1000 * 60 * 60 * 24)
      if (grievanceResponse && grievanceResponse.ServiceWrappers[0].workflow.action === "RATE" && differenceInDays <= 30 ) {
        const additionalDetails = {
          applicantName: typeof grievanceResponse.ServiceWrappers[0].service.additionalDetail === 'string'
          ? grievanceResponse.ServiceWrappers[0].service.citizen.name 
          : grievanceResponse.ServiceWrappers[0].service.additionalDetail?.name || grievanceResponse.ServiceWrappers[0].service.citizen.name,
          location: typeof grievanceResponse.ServiceWrappers[0].service.additionalDetail === 'string' 
          ? grievanceResponse.ServiceWrappers[0].service.tenantId  
          : grievanceResponse.ServiceWrappers[0].service.additionalDetail?.address || grievanceResponse.ServiceWrappers[0].service.tenantId,
          category: grievanceResponse.ServiceWrappers[0].service.serviceCode,
        };
  
        const authToken = window.localStorage.getItem("token")
  
        const data = {
          RequestInfo: {
            apiId: "Rainmaker",
            ver: ".01",
            action: "",
            did: "1",
            key: "",
            msgId: "20170310130900|en_IN",
            requesterId: "",
            authToken: authToken,
          },
          Appeal: {
            tenantId: grievanceResponse.ServiceWrappers[0].service.tenantId,
            grievanceId: serviceRequestId,
            comments: comments,
            accountId: authToken,
            businessService: "APPEAL",
            additionalDetails: additionalDetails,
            workflow: {
              action: "INITIATE",
              assignes: null,
              comments: null,
              verificationDocuments: null,
            },
            documents: null,
          },
        };
  
        try {
          const response = await fetch('/pgr-services/appeal/_create', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data),
          });
  
          const result = await response.json();
          if (response.ok) {
            const appeal = result.Appeals[0];
            setSuccess("Appeal submitted successfully!");
            setApplicationNumber(appeal.applicationNumber);
            setGrievanceIdFromResponse(appeal.grievanceId);
            setShowCard(true);
          } else {
            setError(result.message || "Failed to submit appeal.");
          }
        } catch (err) {
          setError("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Appeal cannot be raised for the given Grievance ID as Feedback/Rating is not provided or Rating Date exceeds the 30 days time limit.");
        setLoading(false);
      };
    } catch (err) {
      setError("An error occurred while fetching grievance data.");
      setLoading(false);
      return;  
    }

    
  }

  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    if (newComment.length <= MAX_COMMENT_LENGTH) {
      setComments(newComment);
    }
  };

  const goHome = () => {
    history.push("/");
  };

  return (
    <div>{showCard ? (
      <div style={styles.card}>
        <h2 style={styles.heading}>Appeal Created Successfully !</h2>
        <p><strong>Appeal ID:</strong> {applicationNumber}</p>
        <p>The appeal has been created for Grievance ID: {grievanceIdFromResponse}</p>
        <button onClick={goHome} style={styles.button}>Go to Home</button>
      </div>
    ) : (<div>
      <h2 style={styles.heading}>Create Appeal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="serviceRequestId" style={styles.label}>Grievance ID</label>
          <input
            type="text"
            id="serviceRequestId"
            value={serviceRequestId}
            onChange={(e) => setServiceRequestId(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label htmlFor="comments" style={styles.label}>Comments</label>
          <textarea
            id="comments"
            value={comments}
            onChange={handleCommentChange}
            maxLength={MAX_COMMENT_LENGTH}
            required
            rows="6"
            style={styles.textarea}
          ></textarea>
          <small>{comments.length} / {MAX_COMMENT_LENGTH} characters</small>
        </div>
        <div style={styles.submitButton}>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Submitting..." : "Submit Appeal"}
          </button>
        </div>
      </form>
      {success && <p style={styles.success}>{success}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>)}
    </div>
  );
};

export default AppealForm;
