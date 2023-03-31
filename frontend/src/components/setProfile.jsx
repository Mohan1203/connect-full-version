import React, { useState, useEffect } from 'react';
import "../style/setProfile.css";

function SetProfile() {
    return (
        <div>
            <div className='setprofile-container'>
                <h3>Set profile</h3>
                <div className='setprofile-form'>
                    <form method='POST'>
                        <div className='setprofile-main-form'>
                            <input type='text' name='name' placeholder='Name' />
                            <textarea name='bio' placeholder='Bio' cols={12} rows={12}>Bio</textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SetProfile;