import React, { useState, useEffect } from "react";
import "../style/feed.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { BiShare } from "react-icons/bi";
import profilepic from "../media/profilePic.webp";
import { Link } from "react-router-dom";
import axios from "axios";



function Feed() {

    const [data, setData] = useState([]);
    const [isLiked,setIsLiked] = useState(<AiOutlineHeart size={29} />)

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:3333",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setData(res.data);
        }).catch(err => console.log(err))
    }, [])

    function likeimage(id) {
        axios({
            method: "PUT",
            url: `http://localhost:3333/like/${id}`,
            headers: {
                "Content_Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            const photoIndex = data.findIndex((photo) => photo._id === id)
            const likedBy = res.data;
            
            const updateData = [...data]
            updateData[photoIndex].likes = likedBy.length
            updateData[photoIndex].likedBy = likedBy
            setData(updateData)
        }).catch((err) => {
            console.log(err)
        })
    }



    return (
        <div className="feed-container" >
            <div className="feed-posts">
                {data.map((item, index) => {
                    return (
                        <div className="feed-post" key={index}>
                            <div className="post-header">
                                <Link to={`/profile/${item.userID._id}`}>
                                    <img src={`http://localhost:3333/profilephoto/${item.userID.profilephoto}`} className="user-profilepic" alt="Dp" />
                                    <h5>{item.userID.username}</h5></Link>
                            </div>
                            <div className="full-post">
                                <div className="post-body">
                                    <img src={`http://localhost:3333/posts/${item.imageName}`} alt="profile pic" />
                                </div>
                                <div className="post-icons">
                                    <form>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            likeimage(item._id)
                                        }}><AiFillHeart size={30}/></button>
                                        <Link to={"/comments"}><button ><GoComment size={29} /></button></Link>
                                        <button ><BiShare size={29} /></button>
                                    </form>
                                </div>
                            </div>

                            <div className="post-footer">
                                <h5>{item.likes}</h5>
                                <div className="post-description">
                                    <Link to={`/profile/${item.userID._id}`} >{item.userID.username}</Link>
                                    <p>{item.caption}</p>
                                </div>

                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Feed;