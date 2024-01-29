import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import TeachUserprofile from "../../teacher/components/Userprofile";
import t1 from "../../imgs/t1.svg";
import t2 from "../../imgs/t2.svg";
import t3 from "../../imgs/t3.svg";
import t6 from "../../imgs/t6.svg";
import prev from "../../imgs/prev.svg";
import { teacherNavbarContext } from "../../contexts/teacherNavbarContext";
function TeacherNavbar({ changeModal, modal }) {
  const [modalClass, setModalClass] = useState("");
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
          ? "Nav  teacher-navbar qaytish"
          : "Nav teacher-navbar"
      }
    >
      <div className={modal ? "circle" : "d-none circle"} onClick={handleClick}>
        <img src={prev} alt="prev" />
      </div>
      <div>
        <TeachUserprofile />
      </div>
      <ul className="teacher_nav_main">
        <li className={`${lesson ? "active" : ""}`}>
          <img src={t1} alt="" />
          <Link to="/teacher/darslar">darslar</Link>
        </li>
        <li className={`${balance ? "active" : ""}`}>
          <img src={t2} alt="" />
          <Link to="/teacher/hisoblar">hisob balans</Link>
        </li>
        <li className={`${download ? "active" : ""}`}>
          <img src={t3} alt="" />
          <Link to="/teacher/kurs">kurs yuklash</Link>
        </li>
        <li className={`${profile ? "active" : ""}`}>
          <img src={t6} alt="" />
          <Link to="/teacher/profile">profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default TeacherNavbar;
