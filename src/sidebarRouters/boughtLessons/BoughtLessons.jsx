import React, { useContext } from "react";
import "./style.css";
import prev from "../../imgs/prev.svg";
import { myCoursesContext } from "../../services/providers/myCoursesContext";

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
function Baystudy({ modalDarslar, changeModalDars, topic }) {
  const { myCourses } = useContext(myCoursesContext);
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
        <h2>Sotib olingan darslar - {myCourses?.length} ta</h2>
        <div className="sidebar-line"></div>
        <div className="sidebar-bought-course">
          {myCourses?.map((item, index) => (
            <div key={item._id} className="cursor_bought_class bought_lessons">
              <img
                src={`${import.meta.env.VITE_API_KEY}` + deleteplatforma(item.obloshka)}
                alt=""
              />
              <div className="text_info">
                <p>{item?.Kursname}</p>
                <strong className="big_style">{item?.narxi} so'm</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Baystudy;
