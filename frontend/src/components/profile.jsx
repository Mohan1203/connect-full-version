import React, { useState, useEffect } from "react";
import "../style/profile.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./navigation"

function Profile() {

    const [data, setData] = useState([]);
    const [followData, setFollowData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userID } = useParams();

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:3333/userprofile/${userID}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
        })


    }, [userID, followData])

    const followUser = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `http://localhost:3333/follow/user/${userID}`,
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setFollowData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <Header />
            {isLoading ? <p>loading</p> :
                <div className="profile-maincontainer">
                    <div className="profile-container">
                        <div className="profile-header">
                            <div className="profile-img">
                                <img src={`http://localhost:3333/profilephoto/${data.profilephoto}`} alt="profile-img" />
                            </div>
                            <div className="profile-userinfo">
                                <div className="profile-userinfo-header">
                                    <div>
                                        <h3>{data.username}</h3>
                                    </div>
                                    <div>
                                        <form method="post">

                                            {userID === localStorage.getItem('userID') ? <Link to={"/editprofile"} style={{ textDecoration: "none", color: "black" }} className="followingbtn">Edit Profile</Link> : data.followers.includes(localStorage.getItem('userID')) ? <button className="followingbtn" onClick={followUser}>Following</button> : <button className="followbtn" onClick={followUser}>Follow</button>}
                                        </form>
                                    </div>
                                </div>
                                <div className="profile-bigdevice-userinfo">
                                    <div className="profile-userinfo-statics">
                                        <p><b>{data.posts ? data.posts.length : 0}</b> posts</p>
                                        <p><b>{data.followersCount}</b> followers</p>
                                        <p><b>{data.followingCount}</b> following</p>
                                    </div>
                                    <div className="profile-bio">
                                        <h3>{data.name}</h3>
                                        <p>{data.bio}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="profile-mobile-userinfo">
                            <div className="profile-mobile-bio">
                                <h3>{data.name}</h3>
                                <p>{data.bio}</p>
                            </div>
                            <div className="profile-mobile-userinfo-statics">
                                <div><p><b>{data.posts ? data.posts.length : 0}</b> posts</p></div>
                                <div><p><b>{data.followersCount}</b> followers</p></div>
                                <div><p><b>{data.followingCount}</b> following</p></div>
                            </div>
                        </div>

                    </div>
                    <div style={{ width: "100%", margin: "auto", border: "1px solid #f8f8f8" }} ></div>
                    <div className="profile-posts">
                        {data.posts ? data.posts.map((item, index) => {
                            return (
                                <div className="profile-images">
                                    <Link to={`/post/${item._id}`}><img src={`http://localhost:3333/posts/${item.imageName}`} alt="" /></Link>
                                </div>
                            )
                        }) : <p>Posts not found</p>}




                    </div>
                </div>
            }
        </div>

    )
}

export default Profile;