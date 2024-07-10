import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import "../style.css";
import LessonCard from "../../components/lessonCard/LessonCard";
import axios from "axios";
import MobileHeader from "../../../components/mobileHeader/mobileHeader";
import TeacherNavbar from "../../../navbar/teacher/TeacherNavbar";
function LessonsTeacher(props) {
  const where = props.where;
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.ilmlar.com/teacher-mycurs/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourses(res.data);
      });
  }, []);

  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);
  function clickModal() {
    setModal(!modal);
  }
  const changeModal = (value) => {
    setModal(value);
  };
  function clickDarslarModal() {
    setModalDarslar(!modalDarslar);
  }
  const changeModalDars = (value) => {
    setModalDarslar(value);
  };

  return (
    <>
      <div className={modal ? "def modal-navbar" : "def yoq"}>
        <TeacherNavbar changeModal={changeModal} modal={modal} />
      </div>
      <div
        // className={
        //   modal || modalDarslar
        //     ? "blur w100 main_lesson mobile"
        //     : "w100 main_lesson"
        // }
        className="mobile_display_none"
      >
        <MobileHeader
          changeModalDars={changeModalDars}
          changeModal={changeModal}
          modal={modal}
          modalDarslar={modalDarslar}
          type={"Darslar"}
          where="teacher"
        />
      </div>
      <div className="main_teacher_content sidebar-main-wrap teacher-main-sidebar">
        <div className="lessons_wrapper">
          {courses.length ? (
            <div className="lessons_wrap">
              {courses.map((course, index) => {
                return <LessonCard where={where} cart={course} key={index} />;
              })}
            </div>
          ) : (
            <h1 className="teacher_lessons_info_title">
              Siz hozircha kurs yuklamagansiz
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default LessonsTeacher;
