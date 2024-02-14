import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import "../style.css";
import MobileHeader from "../../../components/mobileHeader/mobileHeader";
import TeacherNavbar from "../../../navbar/teacher/TeacherNavbar";
import { teacherProfileContext } from "../../../services/providers/teacherProfilContext";

let money = 650000;
money = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
let hisobraqam = 1234567890123456;
hisobraqam = hisobraqam.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
function TeacherBalance() {
  const { teacherProfile } = useContext(teacherProfileContext);

  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);
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
        // className={
        //   modal || modalDarslar
        //     ? "blur w100 main_lesson mobile_none"
        //     : "w100 main_lesson"
        // }
        className="mobile_display_none"
      >
        <MobileHeader
          changeModalDars={changeModalDars}
          changeModal={changeModal}
          modal={modal}
          modalDarslar={modalDarslar}
          type={"Hisob balansi"}
          where="teacher"
        />
      </div>

      <div className="main_teacher_content teacher__hisoblar_wrap teacher-main-sidebar">
        <div className="fife main-content teacher_hisoblar__wrapper">
          <div className="teacher_hisoblar">
            <h2 style={{ fontSize: 22 }}>Hisob balansi:</h2>
            <p style={{ fontSize: 45 }}>{teacherProfile?.hisob} so'm</p>
            <NavLink to="/hisoblar/pulyichish" className="price_btn">
              Pul yechib olish
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherBalance;
