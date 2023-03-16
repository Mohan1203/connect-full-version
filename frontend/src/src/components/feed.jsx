import React from "react";
import "../style/feed.css";
import {GrHomeRounded} from "react-icons/gr"
import {FiSearch} from "react-icons/fi";
import {BsChat} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"

function Home() {
    return (
        <div className="feed-container">
            <div className="navigation">
                <div className="navigation-list">
                    <ul >
                        <a href="#"><li><GrHomeRounded size={30} style={{margin:"0 10px"}} />Home</li></a>
                        <a href="#"><li ><FiSearch size={30} style={{margin:"0 10px"}} />Search</li></a>
                        <a href="#"><li> <BsChat size={30} style={{margin:"0 10px"}}/>Chats</li></a>
                        <a href="#"><li> <CgProfile size={30} style={{margin:"0 10px"}}  />Profile</li></a>
                    </ul>
                </div>
            </div>
            <div className="main-feed">
                <h1>Feed</h1>
            </div>
            <div className="chats">
                <h1>Feed</h1>
            </div>
        </div>
    )
}

export default Home;