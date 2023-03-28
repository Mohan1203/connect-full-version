import React, { useState, useEffect } from "react";
import "../style/comments.css";
import "../style/comments.css";
import { TbSend } from "react-icons/tb";
import Navigation from "./navigation";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

function Comments() {

    const [comment, setcomment] = useState([]);
    const [updatedComment, setUpdatedComment] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const { imgID } = useParams();

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:3333/comment/${imgID}`,
            headers: {
                "Content-Type": "Appplication/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setcomment(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [updatedComment])

    const commentPost = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `http://localhost:3333/comment/${imgID}`,
            data:JSON.stringify({comment:commentContent}),
            headers:{
                "Content-Type":"Application/json",
                "Authorization":localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res.data);
            setUpdatedComment([...comment,res.data]);
            setCommentContent("");
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <Navigation />
            <div className="comment-container">
                <h3>Comments</h3>
                {comment.map((item, index) => {
                    return (
                        <div className="comments" key={index}>
                            <div className="comments-pic">
                                <Link to={`/profile/${item.commentBy._id}`}> <img src={`http://localhost:3333/profilephoto/${item.commentBy
                                    .profilephoto}`} alt="" /></Link>
                            </div>
                            <div className="content">
                                <Link to={`/profile/${item.commentBy._id}`}><h5>{item.commentBy.username}</h5></Link>
                                <p>{item.comment}</p>
                            </div>
                            <div className="delete-btn">Delete</div>
                        </div>
                    )
                })}

                <div className="input-comment">
                    <form method="post" onSubmit={(e)=>{commentPost(e)}}>
                        <div className="comment-box">
                        <input type="text" placeholder="Add a comment..." value={commentContent} onChange={(e)=>{setCommentContent(e.target.value)}}></input>
                        <button type="submit">{<TbSend size={20} style={{ color: "black" }} />}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Comments;