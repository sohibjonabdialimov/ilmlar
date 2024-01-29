import React, { useState } from "react";
import prev from "../../imgs/prev.svg";
import or1 from "../../imgs/or1.svg";
import or2 from "../../imgs/or2.svg";
import './style.css';
function VideosNavbar(props) {
  const {
    courseIndex,
    courseData,
    handleVideoSelection,
    handleCourseIndex,
    changeModal,
    modal,
  } = props;
  const [modalClass, setModalClass] = useState("");

  const handleClick = () => {
    changeModal(false);
  };
  return (
    <div
      className={
        modalClass == "qaytish"
          ? " videos_navbar video_information_scroll qaytish"
          : "videos_navbar video_information_scroll"
      }
    >
      <div className={modal ? "circle" : "d-none circle"} onClick={handleClick}>
        <img src={prev} alt="prev" />
      </div>
      <div className="teacher_all_video_navbar">
        <div>
          {courseData.map((course, index) => (
            <div
              className="teacher_all_video_navbar_one"
              key={index}
              onClick={() => {
                handleVideoSelection(course);
                handleCourseIndex(index + 1);
              }}
            >
              <p className={`${courseIndex==index+1 ? "activevideo" : "noactivevideo"} videos_navbar_text`}>{index + 1}-dars. {course.nomi}</p>
              {
                course.orni ? "" : <img src={or2} alt="" />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideosNavbar;
