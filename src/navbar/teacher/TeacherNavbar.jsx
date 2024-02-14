import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import TeachUserprofile from "../../teacher/components/Userprofile";
import t1 from "../../imgs/t1.svg";
import t2 from "../../imgs/t2.svg";
import t3 from "../../imgs/t3.svg";
import t6 from "../../imgs/t6.svg";
import prev from "../../imgs/prev.svg";
import { teacherNavbarContext } from "../../services/providers/teacherNavbarContext";
function TeacherNavbar({ changeModal, modal }) {
  const [modalClass, setModalClass] = useState("");
  const navigate = useNavigate();
  const {
    lesson,
    setLesson,
    balance,
    setBalance,
    download,
    setDownload,
    profile,
    setProfile,
  } = useContext(teacherNavbarContext);

  useEffect(() => {
    if (window.location.pathname === "/teacher/darslar") {
      setLesson(true);
      setBalance(false);
      setDownload(false);
      setProfile(false);
    } else if (window.location.pathname === "/teacher/hisoblar") {
      setLesson(false);
      setBalance(true);
      setDownload(false);
      setProfile(false);
    } else if (window.location.pathname === "/teacher/kurs") {
      setLesson(false);
      setBalance(false);
      setDownload(true);
      setProfile(false);
    } else if (window.location.pathname === "/teacher/profile") {
      setLesson(false);
      setBalance(false);
      setDownload(false);
      setProfile(true);
    }
  }, [window.location.pathname]);

  const handleClick = () => {
    changeModal(false);
  };

  return (
    <div
      className={
        modalClass == "qaytish"
          ? "Nav teacher-navbar qaytish"
          : "Nav teacher-navbar"
      }
    >
      <div className={modal ? "circle" : "d-none circle"} onClick={handleClick}>
        <img src={prev} alt="prev" />
      </div>
      <div>
        <TeachUserprofile />
      </div>
      <ul className="teacher_nav_main both_nav_class">
        <li onClick={() => navigate("/teacher/darslar")} className={`${lesson ? "active" : ""}`}>
          <img src={t1} alt="" />
          <p>darslar</p>
        </li>
        <li onClick={() => navigate("/teacher/hisoblar")} className={`${balance ? "active" : ""}`}>
          <img src={t2} alt="" />
          <p>hisob balans</p>
        </li>
        <li onClick={() => navigate("/teacher/kurs")} className={`${download ? "active" : ""}`}>
          <img src={t3} alt="" />
          <p>kurs yuklash</p>
        </li>
        <li onClick={() => navigate("/teacher/profile")} className={`${profile ? "active" : ""}`}>
          <img src={t6} alt="" />
          <p>profile</p>
        </li>
      </ul>
    </div>
  );
}

export default TeacherNavbar;
