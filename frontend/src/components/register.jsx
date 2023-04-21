import React, { useState } from "react";
import "../style/login.css"
import { AiFillFacebook } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Register() {





    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


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


    const registerUser = async (e) => {
        if (!email || !fullname || !username || !password) {
            setError("All fields are required");
            navigate("/register");
            return false;
        }
        else if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        } else {
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
                localStorage.setItem("userID", res.data[0])
                localStorage.setItem("token", res.data[1]);
            }).catch((err) => {
                setError(err.response.data)
                navigate("/register")
            })
        }

    }

    const registerWithFacebook = async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider).then((result) => {
                const user = result.user;
                axios({
                    method: "POST",
                    url: "http://localhost:3333/registerWithFacebook",
                    data: JSON.stringify({
                        email: user.email,
                        fullname: user.displayName,
                        username: user.displayName,
                        password: user.uid
                    }),
                    headers:{
                        "Content-Type":"application/json"
                    }
                }).then((res)=>{
                    localStorage.setItem("userID", res.data[0])
                    localStorage.setItem("token", res.data[1]);
                    navigate("/");
                }).catch((err)=>{
                    setError(err.response.data.toString())
                    console.log(err.response)
                    navigate("/register")
                })
            })

    }


    return (
        <div className="container">
            <div className="login">
                <h1 className="instagram">Instagram</h1>
                <h4 className="register-heading">Sign up to see photos and videos from your friends.</h4>
                <a href="#" onClick={registerWithFacebook} style={{ textDecoration: 'none' }}><div style={{ display: 'flex', margin: "10px", padding: "5px", alignItems: "center", fontWeight: "bold" }}><AiFillFacebook size="30px" color="white" style={{ backgroundColor: "blue", borderRadius: "50%", padding: "5px" }} />Register with Facebook</div></a>

                <p style={{ fontWeight: "bold", color: "grey" }}>OR</p>
                <div className="login-form" style={{ marginTop: "10px" }}>
                    <form method="post" name="" onSubmit={(e) => {
                        e.preventDefault()
                        registerUser()
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