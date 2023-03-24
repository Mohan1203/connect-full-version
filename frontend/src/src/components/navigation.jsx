import React,{useState} from "react";
import "../style/navigation.css";
import { GrHomeRounded } from "react-icons/gr"
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navigation() {
    const [active, setActive] = useState(false);
    const [userID,setuserID] = useState(1);

    const showSetting = (e) =>{
        e.preventDefault();
        setActive(!active);
    }

    return (
        <div className="navigation">
            <div className="navigation-list">
                <div className="instagram" style={{ fontSize: "2rem" }}> Instagram</div>
                <ul >
                    <Link to={"/"}><a href="#" onClick={()=>setActive(false)}><li><GrHomeRounded size={30} style={{ margin: "0 10px" }} />Home</li></a></Link>
                    <a href="#" onClick={()=>setActive(false)}><li> <FiSearch size={30} style={{ margin: "0 10px" }} />Search</li></a>
                    <a href="#" onClick={()=>setActive(false)}><li ><AiOutlinePlusCircle size={30} style={{ margin: "0 10px" }} />Add Post</li></a>
                    <Link to={`/profile/${userID}`}><a href="#" onClick={()=>setActive(false)}><li> <CgProfile size={30} style={{ margin: "0 10px" }} />Profile</li></a></Link>
                </ul>
            </div>
            <div className="nav-setting">
                <div className="setting-options" style={active?{display:"flex"}:{display:"none"}}>
                   <ul>
                    <li><a href="#">Your account</a></li>
                    <li><a href="#">Edit Profile</a></li>
                    <li><a href="#">Privacy policy</a></li>
                    <li><a href="#">Contact us</a></li>
                   </ul>

                </div>
                <div className="nav-setting-icon">
                    <a href="#" onClick={showSetting}><FiSettings size={30} style={{ margin: "0 10px" }} />Setting</a>
                </div>
            </div>
        </ div>

    )
}

export default Navigation;