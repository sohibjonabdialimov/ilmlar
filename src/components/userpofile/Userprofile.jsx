import React, { useContext } from "react";
import "./style.css";
import defaultimg from "../../imgs/user-1.png";
import { profileContext } from "../../services/providers/profileContext";
import { formatImgUrl } from "../../utils/formatImgUrl";

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
              src={formatImgUrl(profile?.path)}
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
