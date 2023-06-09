import React, { useState, useEffect } from "react";
import "../style/editprofile.css";
import Navigation from "./navigation";
import axios from "axios"

function EditProfile() {

  const [data, setData] = useState([]);
  const [error,setError] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState();
  const [name, setName] = useState();
  const [bio, setBio] = useState()

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3333/userprofile/${localStorage.getItem("userID")}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      console.log(res.data)
      setData(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }, [updatedData])

  function setProfile(e) {
    e.preventDefault();
    if (!name || !bio || !profilePhoto ) {
      setError("All fields are required fields");
    }else{
      const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (profilePhoto) {
      const blob = new Blob([profilePhoto], { type: profilePhoto.type });
      console.log(blob)
      formData.append('image', blob);
    }
    axios({
      method: "POST",
      url: `http://localhost:3333/userprofile/editprofile`,
      data: formData,
      headers: {

        "Content-Type": "multipart/form-data",
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      setUpdatedData(res.data)
    }).catch((err) => {
      setError(err.response.data.error)
    })
    }
    
  }

  return (

    <div>
      <Navigation />
      <div>
        <div className="editprofile-container">
          <form method="post">
            <div className="editprofile-header">
              <div className="editprofile-changeprofile">
                <div>
                  <img src={`http://localhost:3333/profilephoto/${data.profilephoto}`} alt="profilepic" className="editprofile-profilepic" />
                </div>
                <div >
                  <h3 className="editprofile-username">{data.username}</h3>
                  <input type="file" name="file" id="file" className="editprofile-inputs" onChange={(e) => { setProfilePhoto(e.target.files[0]) }} />
                </div>
              </div>
              <div className="editprofile-fields">
                <span><b>Name*</b></span>
                <input type="text" name="name" id="name" className="editptofile-inputs" value={name} onChange={(e) => { setName(e.target.value) }} />
                
                <span><b>Bio*</b></span>
                <textarea rows={3} cols={25} className="editprofile-textarea" value={bio} onChange={(e) => { setBio(e.target.value) }} />
                
              </div>
              <div style={{color:"red",fontWeight:"bold"}}>{error?error:null}</div>
              <button type="submit" className="editprofile-btn" onClick={setProfile}>Submit</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default EditProfile;