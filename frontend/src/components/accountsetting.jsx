import react, { useState } from 'react';
import "../style/accountsetting.css";
import axios from 'axios';
import Navigation from "./navigation";
import { useNavigate } from 'react-router';

function Accountsetting() {
    const navigate = useNavigate();
    const [password, setpassword] = useState("");
    const [deleteAccountpassword, setDeleteAccountpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deleteAccounterr, setDeleteAccounterr] = useState('');

    function verifyPassword(e) {
        e.preventDefault();
        if (newpassword !== confirmpassword) {
            setError("Password not match");
        } else if (!password || !newpassword || !confirmpassword) {
            setError("Please fill all the fields");
        } else {
            axios({
                method: 'post',
                url: "http://localhost:3333/changepassword",
                data: JSON.stringify({
                    password: password,
                    newpassword: newpassword,
                    confirmpassword: confirmpassword
                }),
                headers: {
                    "content-type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }).then((res) => {
                setSuccess(res.data);
                setError("");
            }).catch((err) => {
                setError(err.response.data);
                setSuccess("");
            })
            setConfirmpassword("");
            setNewpassword("");
            setpassword("");

        }
    }

    function deleteAccount(e) {
        e.preventDefault();
        axios({
            method: 'DELETE',
            url: "http://localhost:3333/deleteaccount",
            data: JSON.stringify({
                password: deleteAccountpassword
            }),
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res.data);
            navigate("/register")
        }).catch((err) => {
            setDeleteAccounterr(err.response.data);
            console.log(err.response.data)
        })
    }

    return (
        <div>
            <Navigation />
            <div>
                <div className='accountsetting-container'>
                    <div className='accountsetting-subcontainer'>
                        <h3>Change password</h3>
                        <p><i>By changing your password, you are taking an important step to secure your account</i></p>
                        <form >
                            <div className='accountsetting-passwordmanage'>
                                <span><b>Old password</b></span>
                                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                <span><b>New password</b></span>
                                <input type="password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} />
                                <span><b>Confirm password</b></span>
                                <input type="password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
                                {error ? <p style={{ fontWeight: "bold", color: "red" }}>{error}</p> : null}
                                {success ? <p style={{ fontWeight: "bold", color: "green" }}>{success}</p> : null}
                                <button type="submit" className='accountsetting-submitbtn' onClick={verifyPassword}>submit</button>
                            </div>
                        </form>
                        <div className='accountsetting-deleteaccount'>
                            <h3>Delete Account</h3>
                            <p style={{ color: "red", fontWeight: "bold" }}><i>By deleting your account you will loose all your data and it's not reversable process</i></p>
                            <form method='POST'>
                                <input type="password" placeholder="Enter your password" value={deleteAccountpassword} onChange={(e)=>setDeleteAccountpassword(e.target.value)}/>
                                <button type="submit" className='accountsetting-deletebtn' onClick={deleteAccount}>Delete</button>
                                {deleteAccounterr ? <p style={{ fontWeight: "bold", color: "red" }}>{deleteAccounterr}</p> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accountsetting;