import React from "react";
import "../style/login.css";
import { AiFillFacebook } from "react-icons/ai";

function Login() {
    return (
        <div className="container">
            <div className="login">
                <h1 className="instagram">Instagram</h1>
                <div className="login-form">
                    <form method="post" >
                        <input type="text" name="username" placeholder="Username" />
                        <input type="password" name="password" placeholder="Password" />
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
            </div>
            <div className="register-box">
                <div className="register-content"><p>Don't have an account? <a href="#" style={{textDecoration:"none",fontWeight:"bold"}}>Sign up</a></p></div>
            </div>
        </div>
    )
}

export default Login;