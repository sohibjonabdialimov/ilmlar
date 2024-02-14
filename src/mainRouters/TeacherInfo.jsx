import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Subs from "../sidebarRouters/Subs";
import axios from "axios";
import urlJoin from "url-join";
import MobileHeader from "../components/mobileHeader/mobileHeader";
import defaultuser from "../imgs/user-1.png";
import Loader from "../components/ui/loader/Loader";

function TeacherInfo() {
  const [profile, setProfil] = useState({});
  const [teacherData, setTeacherData] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);
  const { teacherId } = useParams();
  const [subs, setSubs] = useState([]);
  const [subsBool, setSubsBool] = useState(false);
  const [loader, setLoader] = useState(false);
  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);

  const navigate = useNavigate();
  function deleteplatforma(url) {
    try {
      if (url?.includes("platforma")) {
        url = url.split("/");
        let res = "";
        for (let i = 2; i < url.length; i++) {
          res += "/" + url[i];
        }
        return res;
      } else {
        return url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios.get("https://api.ilmlar.com/teacherinfo/" + teacherId).then((res) => {
      setTeacherData(res.data.mekurs);
      setProfil(res.data);
    });
  }, [teacherId]);

  const changeModal = (value) => {
    setModal(value);
  };
  useEffect(() => {
    axios
      .get("https://api.ilmlar.com/usersme", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSubs(res.data.teachers);
      });
  }, []);
  useEffect(() => {
    for (let i = 0; i < subs.length; i++) {
      if (subs[i] == teacherId) {
        setSubsBool(true);
      }
    }
  }, [subs]);

  const fetchTeachersFunc = async () => {
    const fetchedTeacherData = [];
    setLoader(true);
    for (let i = 0; i < teacherData.length; i++) {
      const response = await axios.get(
        "https://api.ilmlar.com/courses/" + teacherData[i],
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        fetchedTeacherData.push(response.data);
      }
    }
    setLoader(false);
    setTeacherInfo(fetchedTeacherData);
  };
  useEffect(() => {
    if (teacherData.length > 0) {
      fetchTeachersFunc();
    }
  }, [teacherData]);

  function saveObuna(id) {
    axios
      .post(
        "https://api.ilmlar.com/users/obuna",
        {
          teacher_Id: id,
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
  const changeModalDars = (value) => {
    setModalDarslar(value);
  };
  function onBack() {
    navigate(-1);
  }
  return (
    <>
      <div className="main-page">
        <div className="teacherhead">
          <button onClick={onBack} className="back-1">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <div className="mobile_width_class">
            <MobileHeader
              changeModalDars={changeModalDars}
              changeModal={changeModal}
              modal={modal}
              modalDarslar={modalDarslar}
              type={"O'qituvchi haqida"}
              wherey="teach"
            />
          </div>
        </div>
        <div className="w100 main_lesson mobile_none">
          <div className="fife main-content extra_class">
            {loader ? (
              <Loader />
            ) : (
              <div className="my_subs">
                {profile.path ? (
                  <img
                    className="teacher_img"
                    src={urlJoin(
                      "https://api.ilmlar.com",
                      `${deleteplatforma(profile.path)}`
                    )}
                    alt=""
                  />
                ) : (
                  <img className="teacher_img" src={defaultuser}></img>
                )}
                <h2>{profile.fullname}</h2>
                <p>{profile?.obunachilar?.length} ta obunachi</p>
                {subsBool ? (
                  <button
                    onClick={() => {
                      setSubsBool(false);
                      saveObuna(teacherId);
                    }}
                  >
                    Obunadan chiqish
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSubsBool(true);
                      saveObuna(teacherId);
                    }}
                  >
                    Obuna bo'lish
                  </button>
                )}

                <div className="my_subs_desc1">
                  <p>Mutaxasis: {profile.mutahasislik}</p>
                </div>
                <div className="my_subs_desc1">
                  <p>Bio: {profile.bio}</p>
                </div>
                <div className="my_subs_desc2">
                  <p>Joylashuv: {profile.joylashuv}</p>
                  <p>
                    Havola:{" "}
                    <a href={profile.boglashlink}>{profile.boglashlink}</a>
                  </p>
                </div>
                <div className="my_subs_desc">
                  <p>Kurslar soni: {profile?.mekurs?.length}</p>
                </div>
                <h4>Kurslar</h4>
                <div className="my_subs_line"></div>
                <div>
                  {teacherInfo.length != 0 ? (
                    teacherInfo.map((item, index) => {
                      return (
                        <div
                          style={{ cursor: "pointer" }}
                          key={item._id}
                          className="courses_list"
                          onClick={() => {
                            navigate("/student/kurs/" + item._id);
                          }}
                        >
                          <img
                            src={urlJoin(
                              "https://api.ilmlar.com",
                              `${deleteplatforma(item.obloshka)}`
                            )}
                            alt=""
                          />
                          <div
                            className="teacherinfo_courses"
                            style={{ position: "relative" }}
                          >
                            <b>{item.Kursname}</b>
                            <p>{item.Kursdesc}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h2 className="empty_course_desc">Hozircha kurslar yo'q</h2>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="darslar_wrapper Nav">
          <h3>Mening obunalarim</h3>
          <div className="line"></div>
          <Subs />
        </div>
        <div
          style={{ padding: "10px" }}
          className={modalDarslar ? "defDars modalDarslar aa" : "defDars yoq"}
        >
          <div className="darslar_wrapper Nav">
            <div
              style={{
                display: "flex",
                height: "70px",
                alignItems: "center",
                position: "relative",
              }}
            >
              <button
                style={{ marginLeft: "20px", backgroundColor: "#3F315D" }}
                onClick={() => {
                  setModalDarslar(false);
                }}
                className="back-1"
              >
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              <h3> Mening obunalarim</h3>
            </div>
            <div className="line"></div>
            <Subs />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(TeacherInfo);
