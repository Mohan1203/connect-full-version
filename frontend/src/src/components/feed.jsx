import React, { useState } from "react";
import "../style/feed.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { BiShare } from "react-icons/bi";
import profilepic from "../media/profilePic.webp";
import { Link } from "react-router-dom";

function Feed() {
    const [likebtn, setlikebtn] = useState(false);
    const [likes, setlikes] = useState(0);
    const userID = 123;




    const isLikes = (e) => {
        e.preventDefault();
        setlikebtn(!likebtn);
        if (likebtn) {
            setlikes(likes - 1);
        } else {
            setlikes(likes + 1);
        }
    }

    const heart = likebtn ? <AiFillHeart size={30} color={"red"} /> : <AiOutlineHeart size={30} />

    return (
        <div className="feed-container">
            <div className="feed-posts">
                <div className="feed-post">
                    <div className="post-header">
                        <Link to={`/profile/${userID}`}>
                            <img src={profilepic} className="user-profilepic" />
                            <h5>username</h5></Link>
                    </div>
                    <div className="full-post">
                        <div className="post-body">
                            <img src={profilepic} alt="profile pic" />
                        </div>
                        <div className="post-icons">
                            <form>
                                <button onClick={isLikes}>{heart}</button>
                                <Link to={"/comments"}><button ><GoComment size={29} /></button></Link>
                                <button ><BiShare size={29} /></button>
                            </form>
                        </div>
                    </div>

                    <div className="post-footer">
                        <h5>{likes}</h5>
                        <div className="post-description">
                            <a href="#" >username</a>
                            <p>making it look like readable English. Many desktop publishing packages and web page editors .</p>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Feed;