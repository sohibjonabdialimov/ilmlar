import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import Userprofile from "../../components/userpofile/Userprofile";
import t1 from "../../imgs/t1.svg";
import t2 from "../../imgs/t2.svg";
import t6 from "../../imgs/t6.svg";
import prev from "../../imgs/prev.svg";
import or4 from "../../imgs/or4.svg";
import { studentNavbarContext } from "../../contexts/studentNavbarContext";
function StudentNavbar({ changeModal, modal }) {
  const { lesson, setLesson, balance, setBalance, profile, setProfile } =
    useContext(studentNavbarContext);
  const [modalClass, setModalClass] = useState("");
  const [nav, setNav] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    if (
      window.location.pathname === "/student" ||
      window.location.pathname === "/student/"
    ) {
      setLesson(true);
      setBalance(false);
      setProfile(false);
    }
    if (window.location.pathname === "/student/hisoblar") {
      setLesson(false);
      setBalance(true);
      setProfile(false);
    }
    if (window.location.pathname === "/student/profile/subs") {
      setLesson(false);
      setBalance(false);
      setProfile(true);
    }
  }, [window.location.pathname]);
  useEffect(() => {
    if (
      window.location.pathname === "/student" ||
      window.location.pathname === "/student/" ||
      window.location.pathname === "/student/hisoblar" ||
      window.location.pathname === "/student/profile/subs" ||
      window.location.pathname === "/student/profile" ||
      window.location.pathname === "/student/profile/darslar"
    ) {
      setNav(true);
    } else {
      setNav(false);
    }
  }, [window.location.pathname]);
  const handleClick = () => {
    changeModal(false);
  };

  return (
    <div
      className={
        modalClass == "qaytish" ? "Nav  user-navbar qaytish" : "Nav user-navbar"
      }
    >
      <div className={modal ? "circle" : "d-none circle"} onClick={handleClick}>
        <img src={prev} alt="prev" />
      </div>
      <div>
        <Userprofile />
      </div>
      <ul className="student_nav_main">
        {nav ? (
          <>
            <li className={`${lesson ? "active" : ""}`}>
              <img src={t1} alt="" />
              <Link to="/student">darslar</Link>
            </li>
            <li className={`${balance ? "active" : ""}`}>
              <img src={t2} alt="" />
              <Link to="/student/hisoblar">hisob balans</Link>
            </li>
            <li className={`${profile ? "active" : ""}`}>
              <img src={t6} alt="" />
              <Link to="/student/profile/subs">profile</Link>
            </li>
          </>
        ) : (
          <li
            className="active"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img className="navbar_back" src={or4} alt="" />
            <Link>orqaga</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default StudentNavbar;
