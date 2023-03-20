import React from "react";
import "../style/profile.css";
import profilepic from "../media/profilePic.webp";

function Profile() {
    return (
        <div>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-img">
                        <img src={profilepic} alt="profile-img" />
                    </div>
                    <div className="profile-userinfo">
                        <div className="profile-userinfo-header">
                            <h3>username</h3>
                            <form method="post">
                                <button type="submit">Follow</button>
                            </form>
                        </div>
                        <div className="profile-userinfo-statics">
                            <p><b>12,330</b> posts</p>
                            <p><b>330M</b> followers</p>
                            <p><b>330</b> following</p>
                        </div>
                        <div className="profile-bio">
                            <h5>Name</h5>
                            <p>Bio</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="profile-posts">
                    <div className="profile-image">
                        <img src={profilepic} alt="" />
                    </div>
                    
                  
                    
                    
                   
                </div>
            </div>
        </div>
    )
}

export default Profile;