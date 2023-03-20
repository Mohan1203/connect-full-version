import React from "react";
import "../style/comments.css";
import profilepic from "../media/profilePic.webp"
import "../style/comments.css";
import {TbSend} from "react-icons/tb";
import Navigation from "./navigation";


function Comments() {
    return (
        <div>
            <Navigation />
            <div className="comment-container">
                <h3>Comments</h3>
                <div className="comments">
                    <div className="comments-pic">
                       <a href="#"> <img src={profilepic} alt="" /></a>
                    </div>
                    <div className="content">
                        <a href="#"><h5>profileName</h5></a>
                        <p>Comment content</p>
                    </div>
                </div>
                <div className="input-comment">
                    <form method="post">
                    <input type="text" placeholder="Add a comment..."/>
                    <button type="submit">{<TbSend size={20} style={{color:"black"}}/>}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Comments;