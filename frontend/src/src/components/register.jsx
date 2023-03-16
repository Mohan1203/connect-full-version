import React from "react";
import "../style/login.css"
import { AiFillFacebook } from "react-icons/ai";

function Register (){
    return (
        <div className="container">
            <div className="login">
            <h1 className="instagram">Instagram</h1>
                <h4 className="register-heading">Sign up to see photos and videos from your friends.</h4>
                <button className="facebook-button"><AiFillFacebook fill="white" size={20} style={{margin:"0px 10px"}}/> Sign up with facebook</button>
                <p style={{fontWeight:"bold",color:"grey"}}>OR</p>
                <div className="login-form" style={{marginTop:"10px"}}>
                    <form method="post">
                        <input type="email" name="email" placeholder="Email" />
                        <input type="text" name="fullname" placeholder="fullname" />
                        <input type="text" name="Username" placeholder="Username" />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit" className="submit-btn" style={{marginBottom:"2rem"}}>Sign up</button>
                    </form>
                </div>
            </div>
            <div className="register-box">
                <div className="register-content"><p>Have an account? <a href="#" style={{textDecoration:"none",fontWeight:"bold"}}>Log in</a></p></div>
                </div>
        </div>
    )
}

export default Register;