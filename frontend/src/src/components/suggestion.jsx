import React from "react";
import "../style/suggestion.css";
import profilepic from "../media/profilePic.webp";

function Suggestion() {
    return (
        <div className="suggestion-container">
            <div className="suggestion">
                <h3>Suggestions</h3>
                <div className="suggestion-list">
                        <a href="#">
                            <img src={profilepic} className="user-profilepic" />
                            <h5>username</h5></a>
                </div>
            </div>
        </div>
    )
}

export default Suggestion;