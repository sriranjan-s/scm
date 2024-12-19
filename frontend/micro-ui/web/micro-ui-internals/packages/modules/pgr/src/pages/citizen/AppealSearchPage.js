import React, { useState } from "react";

const SearchPage = () => {
  const [applicationNumber, setApplicationNumber] = useState("");
  const [appealData, setAppealData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAppealData(null);

    const url = `/pgr-services/appeal/_search?applicationNumber=${applicationNumber}&tenantId=pg.telecom`;
    const authToken = window.localStorage.getItem("token");

    const data = {
      "RequestInfo": {
          "apiId": "Rainmaker",
          "ver": ".01",
          "action": "",
          "did": "1",
          "key": "",
          "msgId": "20170310130900|en_IN",
          "requesterId": "",
          "authToken": authToken
      }
  }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.Appeals && result.Appeals.length > 0) {
        setAppealData(result.Appeals[0]); 
      } else {
        setError("No appeal found for the provided Appeal ID.");
      }
    } catch (err) {
      setError("An error occurred while fetching the appeal details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Appeal by Appeal ID</h2>

      <form onSubmit={handleSearch} style={styles.form}>
        <div>
          <label htmlFor="applicationNumber" style={styles.label}>Appeal ID</label>
          <input
            type="text"
            id="applicationNumber"
            value={applicationNumber}
            onChange={(e) => setApplicationNumber(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.submitButton}>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {appealData && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Appeal Details</h3>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableCell}><strong>SL No.</strong></td>
                <td style={styles.tableCell}>1</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Appeal ID</strong></td>
                <td style={styles.tableCell}>{appealData.applicationNumber}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Comments</strong></td>
                <td style={styles.tableCell}>{appealData.comments}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Applicant Name</strong></td>
                <td style={styles.tableCell}>{appealData.accountId}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Location</strong></td>
                <td style={styles.tableCell}>{appealData.tenantId}</td> 
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Category</strong></td>
                <td style={styles.tableCell}>{appealData.businessService}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Status</strong></td>
                <td style={styles.tableCell}>{appealData.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    color: "#23316b",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "100%"
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#23316b",
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
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
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  card: {
    padding: "20px",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "500px",
    margin: "20px auto",
  },
  cardTitle: {
    textAlign: "center",
    color: "#23316b",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  submitButton: {
    display: 'block',
    width: '50%',
    margin: '20px auto',
    textAlign: "center"
  },
};

export default SearchPage;
