import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultuser from "../imgs/user-1.png";
import urlJoin from "url-join";
import { subsTeacherContext } from "../contexts/subsTeacherContext";
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
const Subs = () => {
  const navigate = useNavigate();
  const { subsTeacher } = useContext(subsTeacherContext);
  console.log(subsTeacher);
  return (
    <div className="carts-wrapper">
      {subsTeacher?.map((item, index) => (
        <div
          className="obunalar-cart"
          key={item._id}
          onClick={() => {
            navigate("/student/teacherinfo/" + item._id);
          }}
        >
          {item.path ? (
            <img
              className="teacher_img"
              src={urlJoin(
                "https://api.ilmlar.com",
                `${deleteplatforma(item.path)}`
              )}
              alt=""
            />
          ) : (
            <img className="teacher_img" src={defaultuser}></img>
          )}
          <div className="subs_info_wrap">
            <p>{item?.fullname}</p>
            <span>{item?.mutahasislik}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subs;
