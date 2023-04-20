import React, { useState,useContext } from "react";
import "../style/login.css";
import { AiFillFacebook } from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setloginError] = useState("");

    
    const firebaseConfig = {
        apiKey: "AIzaSyBO8uzefkSibPX7fhAIj2qRKb30BT4Cr_s",
        authDomain: "connect-df7f7.firebaseapp.com",
        projectId: "connect-df7f7",
        storageBucket: "connect-df7f7.appspot.com",
        messagingSenderId: "564975718113",
        appId: "1:564975718113:web:372dd8a8f2fb65bdbb71a0",
        measurementId: "G-V8F2T9NBWV"
    };
     firebase.initializeApp(firebaseConfig);


    const validate = (e) => {
        if (!email || !password) {
            setloginError("All fields are required");
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
                setloginError(err.response.data);
                setEmail("");
                setPassword("");
                navigate("/login");
            })
        }
    }


    const loginWithFacebook = async() => {
        const ptovider = new firebase.auth.FacebookAuthProvider();
        const res = await firebase.auth().signInWithPopup(ptovider).then((result)=>{
            const user = result.user;
            axios({
                method:"POST",
                url:"http://localhost:3333/loginWithFacebook",
                data:JSON.stringify({
                    email:user.email,
                    password : user.uid
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res)=>{
                localStorage.setItem("userID",res.data[0]);
                localStorage.setItem("token", res.data[1]);
                navigate("/");
            }).catch((err)=>{
                // setloginError(err.response.data);
                console.log(err.response.data)
                setEmail("");
                setPassword("");
                navigate("/login");
            })
        })
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
                <a href="#" onClick={loginWithFacebook} style={{textDecoration:'none'}}><div style={{ display:'flex',margin: "10px", padding: "5px",alignItems:"center",fontWeight:"bold" }}><AiFillFacebook size="30px" color="white" style={{ backgroundColor: "blue", borderRadius: "50%", padding: "5px" }} />Login with Facebook</div></a>
                </div>
                <div className="forget-password">
                    <a href="#">Forget password?</a>
                </div>
                <div style={{color:"red",fontWeight:"bold"}}>{loginError?loginError:null}</div>
            </div>
            <div className="register-box">
                <div className="register-content"><p>Don't have an account? <Link to="/register" style={{ textDecoration: "none", fontWeight: "bold" }}>Sign up</Link></p></div>
            </div>
        </div>
    )
}

export default Login;