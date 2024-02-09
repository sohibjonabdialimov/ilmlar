import React, { useState } from "react";
import styles from "./style.module.css";

import defaultuser from "../../../imgs/user-1.png";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../../../components/mobileHeader/mobileHeader";
import TeacherNavbar from "../../../navbar/teacher/TeacherNavbar";
import { useContext } from "react";
import { teacherProfileContext } from "../../../contexts/teacherProfilContext";
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
    return "" + url;
  } catch (error) {
    console.log(error);
  }
}
function TeacherProfile() {
  const navigate = useNavigate();
  const { teacherProfile } = useContext(teacherProfileContext);

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
    <div className={styles.teacher_profil}>
      <div className={modal ? "def modal-navbar" : "def yoq"}>
        <TeacherNavbar changeModal={changeModal} modal={modal} />
      </div>
      <div
        className={
          modal || modalDarslar
            ? "blur w100 main_lesson mobile mobile_none"
            : "w100 main_lesson mobile_none"
        }
      >
        <MobileHeader
          changeModalDars={changeModalDars}
          changeModal={changeModal}
          modal={modal}
          modalDarslar={modalDarslar}
          type={"Profile"}
          where="teacher"
        />
      </div>
      <div className="teacherHomePage main_profile_container sidebar-wrap teacher-main-sidebar">
        <div className={styles.teacher_profile_wrap}>
          {teacherProfile?.path ? (
            <img
              src={
                "https://api.ilmlar.com" + deleteplatforma(teacherProfile?.path)
              }
              alt=""
            />
          ) : (
            <img src={defaultuser} alt="" />
          )}
          <h2>{teacherProfile?.fullname}</h2>
          <h4>{teacherProfile?.obunachilar?.length} ta obunachi</h4>
          <div className={styles.profile_teacher_desc}>
            <p>Mutaxassislik: {teacherProfile?.mutahasislik}</p>
            <p>BIO: {teacherProfile?.bio}</p>
            <p>Havolalar: {teacherProfile?.boglashlink}</p>
            <p>Joylashuv: {teacherProfile?.joylashuv}</p>
          </div>

          <div className={styles.profile_buttons}>
            <button onClick={() => navigate("/editteacherprofile")}>
              Profilni tahrirlash
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Chiqib ketish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
