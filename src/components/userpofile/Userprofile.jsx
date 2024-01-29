import React, { useContext, useState } from 'react'
import "./style.css";
import { profileContext } from "../../contexts/profileContext";
import defaultimg from "../../imgs/user-1.png"
function deleteplatforma(url) {
  try {
    if (url?.includes("platforma")) {
      url = url.split("/")
      let res = ""
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i]
      }
      return (res)
    }
    else { return url }

  } catch (error) {
    console.log(error)
  }
}
function Userprofile() {
  const {profile} = useContext(profileContext);

  return (
    <div>
      <div className='userprofile' style={{ textAlign: "center", paddingTop: 15 }}>
        {
          profile?.path ? <img src={"https://api.ilmlar.com" + deleteplatforma(profile?.path)} alt="" /> : <img src={defaultimg} alt="" />
        }
        <h2 style={{marginTop: "15px"}}>{profile?.fullname}</h2>
      </div>
    </div>
  )
}

export default Userprofile;