import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/post.css";
import "../style/feed.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { BiShare } from "react-icons/bi";
import { Link } from "react-router-dom";
import Navigation from "./navigation"
import axios from "axios";
import {AiOutlineDelete} from "react-icons/ai"
import { useNavigate } from "react-router-dom";


function Post() {
    const navigate = useNavigate();
    const { postID } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [updatedData, setUpdatedData] = useState([]);
    const [liked, setLiked] = useState([])


    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:3333/post/${postID}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch(err => console.log(err))
    }, [liked])


    function likeimage(photo) {
        axios({
            method: "PUT",
            url: `http://localhost:3333/like/${postID}`,
            headers: {
                "Content_Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            const photoIndex = data.findIndex((img) => img._id === postID)
            setLiked(res.data);
            const updateData = [...data]
            updateData[photoIndex].likes = liked.length;
            setData(updateData)
        }).catch((err) => {
            console.log(err)
        })
    }

    function deletePost(e){
        e.preventDefault();
        axios({
            method:"DELETE",
            url:`http://localhost:3333/post/delete/${postID}`,
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            }
        }).then((res)=>{
            setUpdatedData(data.filter((item)=>item._id !== postID))
            navigate(`/profile/${localStorage.getItem("userID")}`)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <Navigation />
            <div className="feed-container" >
                <div className="feed-posts">
                    {loading === true ? <h1>Loading...</h1> :
                        data.map((item, index) => {

                            return (<div className="feed-post" key={index}>
                                <div className="post-header">
                                    <div className="postheader-sec1">
                                        <Link to={`/profile/${item.userID._id}`}>
                                            <img src={`http://localhost:3333/profilephoto/${item.userID.profilephoto}`} className="user-profilepic" alt="Dp" />
                                            <h5>{item.userID.username}</h5></Link>
                                    </div>
                                        {
                                            item.userID._id === localStorage.getItem("userID") ? <button className="post-deletebtn" onClick={deletePost}><AiOutlineDelete size={20}/></button> : null
                                        }
                                        
                                    
                                </div>
                                <div className="full-post">
                                    <div className="post-body">
                                        <img src={`http://localhost:3333/posts/${item.imageName}`} alt="profile pic" />
                                    </div>
                                    <div className="post-icons">
                                        <form>
                                            <button id={item._id} onClick={(e) => {
                                                e.preventDefault();
                                                likeimage(item)
                                            }}>{item.likedBy.includes(localStorage.getItem("userID")) ? <AiFillHeart size={30} color={"red"} /> : <AiOutlineHeart size={30} />}</button>
                                            <Link to={`/comments/${item._id}`}><button ><GoComment size={29} /></button></Link>
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
                            </div>)

                        })

                    }
                </div>
            </div>
        </div>
    )
}

export default Post;