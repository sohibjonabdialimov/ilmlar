import React, { useContext } from "react";
import defaultuser from "../../imgs/user-1.png";
import "./style.css";
import { teacherProfileContext } from "../../services/providers/teacherProfilContext";
import { formatImgUrl } from "../../utils/formatImgUrl";

function TeachUserprofile() {
  const { teacherProfile } = useContext(teacherProfileContext);

  return (
    <div>
      <div
        className="userprofile"
        style={{ textAlign: "center", paddingTop: 15 }}
      >
        <div className="flex justify-center items-center">
          {teacherProfile?.path ? (
            <img src={formatImgUrl(teacherProfile?.path)} alt="" />
          ) : (
            <img src={defaultuser} alt="" />
          )}
        </div>

        <h2 style={{ marginTop: "15px" }}>{teacherProfile?.fullname}</h2>
      </div>
    </div>
  );
}

export default TeachUserprofile;
