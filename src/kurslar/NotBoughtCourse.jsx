import React, { useEffect, useState } from "react";
import CommentsList from "../sidebarRouters/commentsList/CommentsList";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import MobileHeader from "../components/mobileHeader/mobileHeader";
import StudentNavbar from "../navbar/student/StudentNavbar";
import axios from "axios";
import defaultuser from "../imgs/user-1.png";
import { notification } from "antd";
import { formatImgUrl } from "../utils/formatImgUrl";
function NotBoughtCourse() {
  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);
  const changeModal = (value) => {
    setModal(value);
  };

  const changeModalDars = (value) => {
    setModalDarslar(value);
  };
  const [kurs, setKurs] = useState({});
  const [teacher, setTeacher] = useState({});
  const { kursId } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_KEY}/courses/` + kursId, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setKurs(res.data);
        axios
          .get(
            res.data.teacher_Id
              ? `${import.meta.env.VITE_API_KEY}/teacherinfo/` + res.data.teacher_Id
              : `${import.meta.env.VITE_API_KEY}/teacherinfo/` + res.data.teacherId
          )
          .then((res) => {
            setTeacher(res.data);
          });
      });
  }, []);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, placement) => {
    api[type]({
      message: "Hisobingizni to'ldiring",
      description: "Bu kursni sotib olish uchun hisobingizni to'ldiring",
      placement,
    });
  };

  function kursOlish(kursId) {
    axios
      .post(
        `${import.meta.env.VITE_API_KEY}/baycurs`,
        {
          cursId: kursId,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((response) => {
        if (response.data !== "hisobingizni toldiring") {
          navigate("/student/kurs/olinganlar/" + kursId);
        } else {
          openNotificationWithIcon("warning", "top");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="main__course-buy">
      {contextHolder}
      <div className="about-head">
        <MobileHeader
          changeModalDars={changeModalDars}
          changeModal={changeModal}
          modal={modal}
          modalDarslar={modalDarslar}
          type={"Kurs haqida"}
        />
      </div>
      <div className="every__cource-info sidebar-main-wrap w100">
        <div className={modal ? "def modal-navbar" : "def yoq"}>
          <StudentNavbar changeModal={changeModal} modal={modal} />
        </div>
        <div
          className={
            modal || modalDarslar
              ? "blur sidebar-main-wrap mobile_none"
              : "sidebar-main-wrap mobile_none"
          }
        >
          <div
            className="every__cource-bigImg"
            style={{
              backgroundImage: `url(${kurs?.obloshka}`,
            }}
          ></div>

          <div className="every__cource-desc">
            <div className="every__cource-header">
              <div
                style={{ cursor: "pointer" }}
                className="every__cource-title"
                onClick={() => {
                  navigate("/student/teacherinfo/" + teacher?._id);
                }}
              >
                {teacher.path ? (
                  <img
                    className="small_img"
                    src={(teacher.path)}
                    alt=""
                  />
                ) : (
                  <img src={defaultuser}></img>
                )}
                <h3>{teacher?.fullname}</h3>
              </div>
            </div>
            <div className="every__cource-name">
              <p>Kurs nomi: {kurs?.Kursname}</p>
            </div>
            <div className="every__cource-about">
              <p>Kurs haqida: {kurs?.Kursdesc}</p>
            </div>
            <div className="every__cource-num">
              <p className="every__cource-para">
                Kurs narxi: {kurs?.narxi} so'm
              </p>
              <p className="every__cource-para">
                Olingan: {kurs?.subs?.length}
              </p>
              <p className="every__cource-para">
                Davomiyligi: {kurs?.muddati} oy
              </p>
            </div>
            <div className="every__course-buttons">
              <button onClick={() => kursOlish(kursId)}>Kursni olish</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mobileForedit">
        <CommentsList commints={kurs?.Comments} />
      </div>
      <div className={modalDarslar ? "defDars modalDarslar aa" : "defDars yoq"}>
        <CommentsList
          modalDarslar={modalDarslar}
          changeModalDars={changeModalDars}
          commints={kurs?.Comments}
        />
      </div>
    </div>
  );
}

export default NotBoughtCourse;
