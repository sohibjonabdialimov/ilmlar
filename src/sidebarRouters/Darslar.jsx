import React, { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { myCoursesContext } from "../services/providers/myCoursesContext";
import { formatImgUrl } from "../utils/formatImgUrl";

const Darslar = () => {
  const navigate = useNavigate();
  const { myCourses } = useContext(myCoursesContext);

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
          <img src={formatImgUrl(item.obloshka)} alt="" />
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
