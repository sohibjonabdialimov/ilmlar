import React, { memo, useContext } from "react";
import "./index.css";
import prev from "../imgs/prev.svg";
import { useNavigate } from "react-router-dom";
import { myCoursesContext } from "../contexts/myCoursesContext";
import { saveCoursesContext } from "../contexts/saveCoursesContext";
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
    return "/" + url;
  } catch (error) {
    console.log(error);
  }
}
function Navvedio({ modalDarslar, changeModalDars, topic }) {
  const { myCourses } = useContext(myCoursesContext);
  const { save } = useContext(saveCoursesContext);
  const navigate = useNavigate();

  const handleClick = () => {
    changeModalDars(false);
  };

  return (
    <div className="Nav sidebar-main-content">
      <div
        className={modalDarslar ? "mobile__header" : "d-none "}
        onClick={handleClick}
      >
        <div className="circle">
          <img src={prev} alt="prev" />
        </div>
        <h3>{topic}</h3>
      </div>
      <div className="mobileForPadding">
        <h2>Olingan darslar - {myCourses?.length} ta</h2>
        <div className="sidebar-line"></div>
        <div className="sidebar-bought-course">
          {myCourses?.map((item, index) => (
            <div
              className="cursor_class bought_lessons"
              key={index}
              onClick={() => {
                navigate("/student/kurs/" + item._id);
              }}
            >
              <img
                src={"https://api.ilmlar.com" + deleteplatforma(item.obloshka)}
                alt=""
              />
              <div className="text_info">
                <p>{item?.Kursname}</p>
                <strong>{item?.Kursdesc}</strong>
              </div>
            </div>
          ))}
        </div>
        <h2 className="saqlanganlar">Saqlanganlar - {save?.length} ta</h2>
        <div className="sidebar-line"></div>
        <div className="saved_courses">
          {save?.map((item, index) => (
            <div
              key={index}
              className="cursor_class bought_lessons"
              onClick={() => {
                navigate("/student/kurs/" + item._id);
              }}
            >
              <img
                src={"https://api.ilmlar.com" + deleteplatforma(item.obloshka)}
                alt=""
              />
              <div className="text_info">
                <p>{item?.Kursname}</p>
                <strong>{item?.Kursdesc}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Navvedio);
