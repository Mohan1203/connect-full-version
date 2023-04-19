import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style/addpost.css";
import axios from 'axios';
import Navigation from './navigation';

function AddPost() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [image,setImage] = useState("");
    const [description,setDescription] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
        axios({
            method: "GET",
            url: "http://loclahost:3333",
            headers: {
                "Cotent-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    },[])

    const addPost = (e) =>{
        e.preventDefault();
     
        const formData = new FormData();
        formData.append("image",image);
        formData.append("caption",description);
        axios({
            method:"POST",
            url:"http://localhost:3333/upload",
            data:formData,
            headers:{
                "Content-Type":"multipart/form-data",
                "Authorization":localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res.data)
            navigate("/")
        }).catch((err)=>{
            console.log(err)
        })       
    }



    return (
        <div>
            <Navigation />
            <div>
                <div className='addpost-container'>
                    <form>
                        <div className='addpost-form'>
                            <div className='addpost-comp1'>
                                <div>
                                    {image? <img src={URL.createObjectURL(image)} alt='image' /> : null}
                                    <input type='file' onChange={(e) => setImage(e.target.files[0])} />

                                </div>
                            </div>
                            <div className='addpost-comp2'>
                                <div className='addpost-comp2'>
                                    <input type='text' placeholder='description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                                    <button type='submit' onClick={addPost} disabled={!image} className={image?'addpost-btn':'addpost-disabledbtn'}>Post</button>
                                    
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPost;