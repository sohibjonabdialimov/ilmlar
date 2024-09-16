import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import "../../../App.css";
import TeacherNavbar from "../../../navbar/teacher/TeacherNavbar";
import MobileHeader from "../../../components/mobileHeader/mobileHeader";
const SelectDownloadCourse = () => {
  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);
  function clickModal() {
    setModal(!modal);
  }
  const changeModal = (value) => {
    setModal(value);
  };
  const changeModalDars = (value) => {
    setModalDarslar(value);
  };

  return (
    <>
      <div className={modal ? "def modal-navbar" : "def yoq"}>
        <TeacherNavbar changeModal={changeModal} modal={modal} />
      </div>
      <div
        className={styles.mobile_display_none}
      >
        <MobileHeader
          changeModalDars={changeModalDars}
          changeModal={changeModal}
          modal={modal}
          modalDarslar={modalDarslar}
          type={"Kurs yuklash"}
          where="teacher"
        />
      </div>
      <div className="teacherHomePage main_profile_container sidebar-wrap teacher-main-sidebar">
        <div className={styles.buttons}  >
          <NavLink to="/kurs/money">Kurs yuklash</NavLink>
        </div>
      </div>
    </>
  );
};

export default SelectDownloadCourse;
