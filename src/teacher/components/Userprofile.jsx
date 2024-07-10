import React, { useContext } from "react";
import defaultuser from "../../imgs/user-1.png";
import "./style.css";
import { teacherProfileContext } from "../../services/providers/teacherProfilContext";
function deleteplatforma(url) {
  try {
    if (url.includes("platforma")) {
      url = url.split("/");
      let res = "";
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i];
      }
      return res;
    }
    return "" + url;
  } catch (error) {
    console.log(error);
  }
}
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
            <img
              src={
                "https://api.ilmlar.com" + deleteplatforma(teacherProfile?.path)
              }
              alt=""
            />
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
