import React, { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { myCoursesContext } from "../services/providers/myCoursesContext";

const Darslar = () => {
  const navigate = useNavigate();
  const { myCourses } = useContext(myCoursesContext);

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

  return (
    <div className="carts-wrapper">
      {myCourses?.map((item) => (
        <div
          key={item._id}
          onClick={() => {
            navigate("/student/kurs/" + item._id);
          }}
          className="cursor_bought_class bought_lessons"
        >
          <img
            src={`${import.meta.env.VITE_API_KEY}` + deleteplatforma(item.obloshka)}
            alt=""
          />
          <div className="text_info">
            <p>{item?.Kursname}</p>
            <strong>{item?.Kursdesc}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Darslar);
