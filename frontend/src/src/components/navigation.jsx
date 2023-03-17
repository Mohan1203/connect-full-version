import React from "react";
import "../style/navigation.css";
import { GrHomeRounded } from "react-icons/gr"
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi";

function Navigation() {
    return (
        <div className="navigation">
            <div className="navigation-list">
                <div className="instagram" style={{ fontSize: "2rem" }}> Instagram</div>
                <ul >
                    <a href="#"><li><GrHomeRounded size={30} style={{ margin: "0 10px" }} />Home</li></a>
                    <a href="#"><li> <FiSearch size={30} style={{ margin: "0 10px" }} />Search</li></a>
                    <a href="#"><li ><AiOutlinePlusCircle size={30} style={{ margin: "0 10px" }} />Add Post</li></a>
                    <a href="#"><li> <CgProfile size={30} style={{ margin: "0 10px" }} />Profile</li></a>
                </ul>
            </div>
            <div className="nav-setting">
                <div className="nav-setting-icon">
                    <a href="#"><FiSettings size={30} style={{ margin: "0 10px" }} />Setting</a>
                </div>
            </div>
        </ div>

    )
}

export default Navigation;