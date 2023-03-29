import React, { useState } from "react";
import "../style/login.css";
import { AiFillFacebook } from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login"
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validate = (e) => {
        if (!email || !password) {
            setError("All fields are required");
        }else{
            axios({
                method:"POST",
                url:"http://localhost:3333/login",
                data:JSON.stringify({
                    email:email,
                    password:password
                }),
                headers:{
                    "Content-Type" :"application/json"
                }
            }).then((res)=>{
                localStorage.setItem("userID",res.data[0]);
                localStorage.setItem("token", res.data[1]);
                console.log(res.data)
                navigate("/");
            }).catch((err)=>{
                console.log(err)
                setError(err.response.data);
                navigate("/login");
            })
        }
    }
    return (
        <div className="container">
            <div className="login">
                <h1 className="instagram">Instagram</h1>
                <div className="login-form">
                    <form method="post" onSubmit={(e)=>{
                        e.preventDefault();
                        validate()}}>
                        <input type="text" name="username" placeholder="Username" value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <button type="submit" className="submit-btn">Log in</button>
                    </form>
                </div>
                <p style={{ fontWeight: "bold", color: "grey" }}>OR</p>
                <div className="facebook-login">
                    <a href="#" className="facebook-btn"><AiFillFacebook fill="blue" size={23} style={{ margin: "0px 10px" }} />Log in with facebook</a>
                </div>
                <div className="forget-password">
                    <a href="#">Forget password?</a>
                </div>
                <div style={{color:"red",fontWeight:"bold"}}>{error?error:null}</div>
            </div>
            <div className="register-box">
                <div className="register-content"><p>Don't have an account? <Link to="/register" style={{ textDecoration: "none", fontWeight: "bold" }}>Sign up</Link></p></div>
            </div>
        </div>
    )
}

export default Login;