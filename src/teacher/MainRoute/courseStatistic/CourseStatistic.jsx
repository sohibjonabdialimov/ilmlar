import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import img from "../../../imgs/statistika.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function deleteplatforma(url) {
  try {
    if (url.includes("platforma")) {
      url = url.split("/")
      let res = ""
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i]
      }
      return (res);
    }
    return "/" + url
  } catch (error) {
    console.log(error)
  }
}
const CourseStatistic = () => {

  const { course } = useParams();
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_KEY}/courseone/me`, { cursId: course }, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setCourses(res.data);
      });
  }, []);
  return (
    <div className="app-content">
      <div className="global_wrap">
        <div className={styles.course_statistic}>
          <button onClick={onBack} className={styles.back}>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <div className={styles.course_statictic_wrap}>
            <div className={styles.img_card}>
              <img src={`${import.meta.env.VITE_API_KEY}` + deleteplatforma(courses.obloshka)} alt="" />
              <div className={styles.img_card_desc}>
                <h3>{courses.Kursname}</h3>
                <p>{courses.Kursdesc}</p>
              </div>
            </div>
            <div className={styles.course_statictic_desc}>
              <h2>Kurs statistikasi</h2>
              {
                courses.created_at ? <p>Yaratilgan vaqt: {String(courses?.created_at).split("T")[0].split("-")[2] || "aniq emas"}.{String(courses?.created_at).split("T")[0].split("-")[1] || ""}.{String(courses?.created_at).split("T")[0].split("-")[0] || "0"}</p>:
                ""
              }
              <p>Narxi: {courses.narxi * 0.8} so'm</p>
              <p>Kurs davomiyligi: {courses?.muddati} oy</p>
              <p>Kurs o'qilish jarayonida: {courses?.subs?.length}</p>
              <p>Kurs daromadi: {courses?.profit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStatistic;
