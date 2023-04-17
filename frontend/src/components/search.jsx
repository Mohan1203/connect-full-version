import React, { useState } from "react";
import Navigation from "./navigation";
import { BsSearch } from "react-icons/bs";
import "../style/search.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Search() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState("");
    const [error, setError] = useState("");

    function getSearchValue(e) {
        e.preventDefault();
        axios({
            method: "GET",
            url: `http://localhost:3333/search?username=${search}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            setError(err.response.data);
        })
    }

    return (
        <div>
            <Navigation />
            <div className="search-container">
                <form method="GET" onSubmit={getSearchValue}>
                    <div className="search-box">
                        <input type="text" name="search" placeholder="Enter Username Only" className="search-box-input" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="submit" className="search-box-btn"><BsSearch size={20} /></button>
                    </div>
                </form>
                {data ? <div className="search-result-main">
                    <div className="search-result">
                        <div className="search-result-img">
                            <Link to={`/profile/${data._id}`}><img src={`http://localhost:3333/profilephoto/${data.profilephoto}`} alt="profile-img" /></Link>
                        </div>
                        <div className="search-result-userinfo">
                            <Link to={`/profile/${data._id}`}><h5>{data.username}</h5>
                                <p>{data.name}</p></Link>
                        </div>
                    </div>
                </div> :
                    error ? <h3 style={{color:"red",textAlign:"center",margin:"10px 0px"}}>{error}</h3>:null}
            </div>
        </div>
    )
}

export default Search;

