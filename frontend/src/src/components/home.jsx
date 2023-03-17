import React from "react";
import Navigation from "./navigation";
import Feed from "./feed";
import Suggestion from "./suggestion";
import "../style/home.css"

function Home() {
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