import React from 'react';
import { Route, Switch, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const GrievanceInfo = () => {

    const { t } = useTranslation();
    const location = useLocation();
    const { path, url } = useRouteMatch();
    const history = useHistory();


    const handleSubmit =(event)=>{
        event.preventDefault();
        history.push(`/digit-ui/citizen/pgr/create-complaint/ministry-selector` )
    }
    return (
        <div className="grievance-container">
            <style>
                {
                    `
                    .grievance-container {
                        
                        margin: auto;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                    }
                    
                    h2 {
                        text-align: center;
                        color: #003366;
                    }
                    
                    .topic-grid {
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        gap: 10px;
                        margin-bottom: 20px;
                    }
                    
                    .topic-box {
                        background-color: #f0f4ff;
                        border: 1px solid #003366;
                        border-radius: 8px;
                        padding: 20px;
                        text-align: center;
                        font-weight: bold;
                        color: #003366;
                        display: flex;            /* Enables flexbox */
                        justify-content: center;  /* Horizontally centers the content */
                        align-items: center;      /* Vertically centers the content */
                        height:40vh;
                         
                    }
                    
                    .topic-details {
                        grid-column: span 4;
                    }
                    
                    .next-button, .suggestion-button {
                        display: block;
                        margin: 10px auto;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        background-color:#23316b;
                        color: white;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    
                    .next-button:hover, .suggestion-button:hover {
                        background-color: #23316b;
                    }
                    
                    .suggestion-input {
                        width: 100%;
                        height: 100px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        padding: 10px;
                        resize: none;
                        margin-bottom: 10px;
                    }
                    .suggestion{
                        display: flex;
                        align-items: center;
                        width: 100%;
                        justify-content: space-around;
                        color: #23316b;
                        font-weight: 700;
                        font-size: x-large;
                    }
                    .headerTopic{
                        font-weight: 900;
                        font-size: xx-large;
                    }
                    `
                }
            </style>
            <h2 className='headerTopic'>Topics that can not be treated as Grievance</h2>
            <div className="topic-grid">
                <div className="topic-box">RTIMatters</div>
                <div className="topic-box">Court related / Subjudice matters</div>
                <div className="topic-box">Religious matters</div>
                <div className="topic-box">Suggestions</div>
                <div className="topic-box">
                    Grievances of Government employees concerning their service matters including disciplinary proceedings etc.
                </div>
            </div>
            <button className="next-button" onClick={handleSubmit}>Next ➔</button>
            <span className='suggestion'>Write down your suggestions here..</span>
            {/* <textarea className="suggestion-input" placeholder="Write down your suggestions here..."></textarea> */}
            <button className="suggestion-button">Suggestion</button>
        </div>
    );
};

export default GrievanceInfo;