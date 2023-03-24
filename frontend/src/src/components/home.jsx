import React,{useEffect} from "react";
import Navigation from "./navigation";
import Feed from "./feed";
import Suggestion from "./suggestion";
import "../style/home.css"
import {useNavigate} from "react-router-dom"

function Home() {
const navigate = useNavigate();
useEffect(()=>{
    document.title = "Instagram"
    if(!localStorage.getItem("token")){
        navigate("/login")
    }else{
        navigate("/")
    }
},[])

    return (
        <div className="home-container">
            <div className="home-navigation">
                <Navigation />
            </div>
            <div className="home-feed">
                <Feed/>
            </div>
            <div className="home-suggestion">
                <Suggestion/>
            </div>
        </div>
    )
}

export default Home;