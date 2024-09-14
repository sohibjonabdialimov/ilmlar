import React, { useContext, useState } from "react";
import "./style.css";
import defaultimg from "../../imgs/user-1.png";
import { profileContext } from "../../services/providers/profileContext";
function deleteplatforma(url) {
  try {
    if (url?.includes("platforma")) {
      url = url.split("/");
      let res = "";
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i];
      }
      return res;
    } else {
      return url;
    }
  } catch (error) {
    console.log(error);
  }
}
function Userprofile() {
  const { profile } = useContext(profileContext);

  return (
    <div>
      <div
        className="userprofile"
        style={{ textAlign: "center", paddingTop: 15 }}
      >
        <div className="flex items-center justify-center">
          {profile?.path ? (
            <img
              src={deleteplatforma(profile?.path)}
              alt=""
            />
          ) : (
            <img src={defaultimg} alt="" />
          )}
        </div>
        <h2 style={{ marginTop: "15px" }}>{profile?.fullname}</h2>
      </div>
    </div>
  );
}

export default Userprofile;
