import React, { useState, useEffect } from "react";
import "../style/login.css"
import { AiFillFacebook } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    

    const func = async (e) => {
        if (!email || !fullname || !username || !password) {
            setError("All fields are required");
            navigate("/register");
            return false;
        }
        else if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }else{
            axios({
                method: "POST",
                url: "http://localhost:3333/register",
                data: JSON.stringify({
                    email: email,
                    fullname: fullname,
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                navigate("/");
                localStorage.setItem("userID",res.data[0])
                localStorage.setItem("token", res.data[1]);
            }).catch((err) => {
                setError(err.response.data)
                navigate("/register")
            })
        }
       
        
    }

    


    return (
        <div className="container">
            <div className="login">
                <h1 className="instagram">Instagram</h1>
                <h4 className="register-heading">Sign up to see photos and videos from your friends.</h4>
                <button className="facebook-button"><AiFillFacebook fill="white" size={20} style={{ margin: "0px 10px" }} /> Sign up with facebook</button>
                <p style={{ fontWeight: "bold", color: "grey" }}>OR</p>
                <div className="login-form" style={{ marginTop: "10px" }}>
                    <form method="post" name="" onSubmit={(e)=>{
                        e.preventDefault()
                        func()
                    }}>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" name="fullname" placeholder="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        <input type="text" name="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="submit-btn" style={{ marginBottom: "2rem" }} >Sign up</button>
                        <div style={{ color: "red", }}>{error ? error : null}</div>
                    </form>
                </div>
            </div>
            <div className="register-box">
                <div className="register-content"><p>Have an account? <Link to={"/login"} style={{ textDecoration: "none", fontWeight: "bold" }}>Log in</Link></p></div>
            </div>
        </div>
    )
}

export default Register;