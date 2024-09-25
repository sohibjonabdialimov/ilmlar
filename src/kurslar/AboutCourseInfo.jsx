import React, { memo, useEffect, useState } from "react";
import CommentsList from "../sidebarRouters/commentsList/CommentsList";
import { useNavigate, useParams } from "react-router-dom";
import coin from "../imgs/coin.png";
import "./index.css";
import MobileHeader from "../components/mobileHeader/mobileHeader";
import StudentNavbar from "../navbar/student/StudentNavbar";
import axios from "axios";
import defaultuser from "../imgs/user-1.png";
import default_lesson from "../imgs/default_lesson.png";

import { Progress } from "antd";
import { formatImgUrl } from "../utils/formatImgUrl";
import CustomVideo from "../components/ui/video-player/CustomVideo";
function findCursById(cursList, cursId) {
  for (let i = 0; i < cursList?.length; i++) {
    if (cursList[i]?.cursId === cursId) {
      return cursList[i].qachongacha;
    }
  }
  return false;
}
function AboutCourseInfo() {
  const [hisoblanuvchi_vaqt, sethisoblanuvchi_vaqt] = useState({
    oy: 0,
    kun: 0,
    soat: 0,
    minut: 0,
    secund: 0,
  });

  const [kurs, setKurs] = useState({});
  const [teacher, setTeacher] = useState({});
  const { kursId } = useParams();
  const [savedCourse, setSavedCourse] = useState([]);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfil] = useState({});
  const [vaqt, setvaqt] = useState(0);
  function savekurs(id) {
    axios
      .post(
        `${import.meta.env.VITE_API_KEY}/users/savecurs`,
        {
          cursId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_KEY}/usersme`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSavedCourse(res?.data?.savecurss);
      });
  }, []);
  useEffect(() => {
    for (let i = 0; i < savedCourse.length; i++) {
      if (savedCourse[i] == kursId) {
        setSaved(true);
      }
    }
  }, [savedCourse]);
  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);
  const changeModal = (value) => {
    setModal(value);
  };

  const changeModalDars = (value) => {
    setModalDarslar(value);
  };

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
              ? `${import.meta.env.VITE_API_KEY}/teacherinfo/` +
                  res.data.teacher_Id
              : `${import.meta.env.VITE_API_KEY}/teacherinfo/` +
                  res.data.teacherId
          )
          .then((res) => {
            setTeacher(res.data);
          });
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_KEY}/usersme`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        
        setProfil(res.data);
      });
  }, []);
  function onBack() {
    navigate(-1);
  }
  const hozir = Date.now();
  useEffect(() => {
    const muddati = findCursById(profile.mycurs, kursId);

    setvaqt(muddati * 1000);
    hisoblanuvchi_vaqt.oy = (vaqt - hozir) / (1000 * 60 * 60 * 24 * 30);
    hisoblanuvchi_vaqt.oy = Math.floor(hisoblanuvchi_vaqt.oy);
    hisoblanuvchi_vaqt.kun =
      (vaqt - hozir - hisoblanuvchi_vaqt.oy * 30 * 24 * 60 * 60 * 1000) /
      (1000 * 60 * 60 * 24);
    hisoblanuvchi_vaqt.kun = Math.floor(hisoblanuvchi_vaqt.kun);
    hisoblanuvchi_vaqt.soat =
      (vaqt -
        hozir -
        hisoblanuvchi_vaqt.oy * 30 * 24 * 60 * 60 * 1000 -
        hisoblanuvchi_vaqt.kun * 24 * 60 * 60 * 1000) /
      (1000 * 60 * 60);
    hisoblanuvchi_vaqt.soat = Math.floor(hisoblanuvchi_vaqt.soat);
    hisoblanuvchi_vaqt.minut =
      (vaqt -
        hozir -
        hisoblanuvchi_vaqt.oy * 30 * 24 * 60 * 60 * 1000 -
        hisoblanuvchi_vaqt.kun * 24 * 60 * 60 * 1000 -
        hisoblanuvchi_vaqt.soat * 60 * 60 * 1000) /
      (1000 * 60);
    hisoblanuvchi_vaqt.minut = Math.floor(hisoblanuvchi_vaqt.minut);
    hisoblanuvchi_vaqt.secund =
      (vaqt -
        hozir -
        hisoblanuvchi_vaqt.oy * 30 * 24 * 60 * 60 * 1000 -
        hisoblanuvchi_vaqt.kun * 24 * 60 * 60 * 1000 -
        hisoblanuvchi_vaqt.soat * 60 * 60 * 1000 -
        hisoblanuvchi_vaqt.minut * 60 * 1000) /
      1000;
    hisoblanuvchi_vaqt.secund = Math.floor(hisoblanuvchi_vaqt.secund);
  }, [profile, kurs, hozir]);

  return (
    <div className="main__course-buy">
      <div className="about-head">
        <div style={{ display: "flex" }}>
          <button onClick={onBack} className="back-1">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <div className="mobile_width_class">
            <MobileHeader
              changeModalDars={changeModalDars}
              changeModal={changeModal}
              modal={modal}
              modalDarslar={modalDarslar}
              type={"Kurs haqida"}
              wherey="teach"
            />
          </div>
        </div>
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
          {kurs.treeler == "" ? (
            kurs?.obloshka ? (
              <img
                className="every__cource-bigImg"
                src={formatImgUrl(kurs?.obloshka)}
                alt=""
              />
            ) : (
              <img
                className="every__cource-bigImg"
                src={default_lesson}
                alt=""
              />
            )
          ) : (
            <CustomVideo videosrc={kurs?.treeler} />
          )}

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
                    src={formatImgUrl(teacher.path)}
                    alt=""
                  />
                ) : (
                  <img src={defaultuser}></img>
                )}
                <h3>{teacher?.fullname}</h3>
              </div>
              <div className="every__cource-nav">
                {saved ? (
                  <ion-icon
                    onClick={() => {
                      savekurs(kursId);
                      setSaved(false);
                    }}
                    name="bookmark"
                  ></ion-icon>
                ) : (
                  <ion-icon
                    onClick={() => {
                      savekurs(kursId);
                      setSaved(true);
                    }}
                    name="bookmark-outline"
                  ></ion-icon>
                )}
                {kurs?.narxi == 0 ? (
                  <span className="free_mark">Bepul</span>
                ) : (
                  <img src={coin} alt="" />
                )}
              </div>
            </div>

            {findCursById(profile?.mycurs, kursId) ? (
              <div>
                <div className="every__cource-name">
                  <p>Kurs nomi: {kurs?.Kursname}</p>
                </div>
                <div>
                  <Progress
                    percent={
                      Math.floor(
                        ((vaqt - Date.now()) /
                          (kurs.muddati * 30 * 24 * 3600 * 1000)) *
                          100
                      ) || 0
                    }
                    size={[, 20]}
                    trailColor="rgba(0,0,0,0.3)"
                    status="active"
                    strokeColor={"#00E03F"}
                  ></Progress>
                </div>
                <div className="vaqt">
                  <p>
                    {hisoblanuvchi_vaqt.oy > 0 ? hisoblanuvchi_vaqt.oy : 0} oy{" "}
                    {hisoblanuvchi_vaqt.kun} kun {hisoblanuvchi_vaqt.soat} soat{" "}
                    {hisoblanuvchi_vaqt.minut} minut {hisoblanuvchi_vaqt.secund}{" "}
                    soniya
                  </p>
                </div>
                <div className="every__course-buttons">
                  <button
                    onClick={() => {
                      navigate("/student/kurs/olinganlar/" + kursId);
                    }}
                  >
                    davom etish
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="every__cource-num">
                  <p className="every__cource-para">
                    Kurs narxi: {kurs?.narxi} so'm
                  </p>
                  <p className="every__cource-para">
                    Olingan: {kurs?.subs?.length || kurs?.subs}
                  </p>
                  <p className="every__cource-para">
                    Davomiyligi: {kurs?.muddati} oy
                  </p>
                </div>
                <div className="every__cource-name">
                  <p>Kurs nomi: {kurs?.Kursname}</p>
                </div>
                <div className="every__cource-about">
                  <p>Kurs haqida: {kurs?.Kursdesc}</p>
                </div>
                <div className="every__course-buttons">
                  <button
                    onClick={() => {
                      navigate("/student/kurs/olinganlar/" + kursId);
                    }}
                  >
                    Video darslar
                  </button>

                  <button
                    onClick={() =>
                      navigate("/student/notboughtcouse/" + kursId)
                    }
                  >
                    Kursni olish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mobileForedit">
        <CommentsList
          commints={kurs?.Comments ? kurs?.Comments : kurs?.Comment}
        />
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

export default memo(AboutCourseInfo);
