import React, { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function PaidCourseDownload() {
  const modalRef = useRef();
  const titleInputRef = useRef();
  const isopenRef = useRef();
  const courseNameRef = useRef();
  const courseDescRef = useRef();
  const courseImgRef = useRef();
  const coursevideoRef = useRef();
  const treilerRef = useRef(null);

  const courseMuddatiRef = useRef();
  const descriptionInputRef = useRef();
  const fileInputRef = useRef();
  const [videoLessons, setVideoLessons] = useState([{ id: 1 }]);
  const [narx, setnarx] = useState(0);
  const [upload, setupload] = useState(0);
  const [image, setImage] = useState("");
  const [video, setvideo] = useState("");

  const [videoDataArray, setVideoDataArray] = useState([]);
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/teacher/kurs");
  };
  const addVideoLesson = (e) => {
    e.preventDefault();
    try {
      const title = titleInputRef.current.value;
      const description = descriptionInputRef.current.value;
      const file = fileInputRef.current.files[0];
      const isopen = isopenRef.current.value;

      if (!title) {
        toast("Iltimos, video nomini kiriting");
        return 0;
      } else if (!description) {
        toast("Iltimos, videoga izoh bering");
        return 0;
      } else if (!file) {
        toast("Iltimos, videoni kiriting");
        return 0;
      }
      const newId = videoLessons.length + 1;
      const newVideoLesson = { id: newId };
      setVideoLessons([...videoLessons, newVideoLesson]);
      const videoData = {
        id: newId - 1,
        title,
        description,
        file,
        isopen,
      };

      setVideoDataArray((prevData) => [...prevData, videoData]);
    } catch (error) {
      const newId = videoLessons.length + 1;
      const newVideoLesson = { id: newId };
      setVideoLessons([...videoLessons, newVideoLesson]);
    }
  };

  const onHandleForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("obloshka", e.target[2].files[0]);
    formData.append("treeler", e.target[3].files[0]);
    formData.append("name", e.target[0].value);
    formData.append("desc", e.target[1].value);
    formData.append("muddati", e.target[5].value);
    formData.append("narxi", +e.target[4].value * 1.25);

    axios
      .post(`${import.meta.env.VITE_API_KEY}/courses-create`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("id", res.data._id);
        navigate("/teacher/course-fragment");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // const onSendForm = () => {
  //   const formData = new FormData();
  //   formData.append("obloshka", courseImgRef.current.files[0]);
  //   formData.append("treeler", coursevideoRef.current.files[0]);
  //   formData.append("name", courseNameRef.current.value);
  //   formData.append("desc", courseDescRef.current.value);
  //   formData.append("muddati", courseMuddatiRef.current.value);
  //   formData.append("narxi", narx * 1.25 || 0);

  //   axios
  //     .post(`${import.meta.env.VITE_API_KEY}/courses-create`, formData, {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         navigate("/teacher/course-fragment");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handleTreilerChange = (event) => {
    console.log("change");

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setvideo(reader.result);
      treilerRef.current.value = "Yuklandi";
    };
  };
  const handleChangePrice = (e) => {
    if (e.target.value > 10000000000 || e.target.value < 0) {
      return;
    }
    setnarx(e.target.value);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="app-content">
        <div className="global_wrap">
          <div className={styles.course_download_wrapper}>
            <div className={styles.kurs_yuklash}>
              <button onClick={onBack} className={styles.back}>
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              <h1>Kurs yaratish</h1>
              <form
                onSubmit={(e) => onHandleForm(e)}
                className={styles.kurs_yuklash_form}
              >
                <div className={styles.input_wrap}>
                  <label htmlFor="amount">Kurs nomi</label>
                  <input ref={courseNameRef} type="text" />
                </div>
                <div className={styles.input_wrap}>
                  <label htmlFor="amount">Kurs haqida</label>
                  <textarea ref={courseDescRef}></textarea>
                </div>
                <div className={styles.upload_div}>
                  <div className="flex sm:gap-10 gap-2 sm:flex-row flex-col justify-between w-full">
                    <div className="flex sm:w-1/2 gap-5 sm:gap-10 w-full justify-between">
                      <div
                        style={{ width: "50%" }}
                        className={styles.input_file}
                      >
                        {!image && <p>Muqova uchun rasm</p>}
                        <input
                          onChange={handleInputChange}
                          ref={courseImgRef}
                          type="file"
                          placeholder="Muqova uchun rasm"
                          accept="image/*"
                        />
                        {image && (
                          <div style={{ height: "100%" }}>
                            <img
                              src={image}
                              alt="selected"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        style={{ width: "50%" }}
                        className={styles.style_wrap}
                      >
                        <div className={styles.input_file}>
                          {!video && (
                            <p ref={treilerRef}>Treyler bu ixtiyoriy</p>
                          )}
                          <input
                            onChange={(e) => handleTreilerChange(e)}
                            ref={coursevideoRef}
                            type="file"
                            placeholder="Muqova uchun rasm"
                            accept="video/*"
                          />
                          {/* {video && (
                            <div style={{ height: "100%" }}>
                              <vedio
                                src={video}
                                muted
                                autoPlay
                                alt="selected"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="flex gap-5 sm:gap-10 justify-between w-full">
                        <div className={styles.input_wrap}>
                          <p htmlFor="amount" className={styles.amount}>
                            Narxi
                          </p>

                          <input
                            type="number"
                            value={narx}
                            onChange={handleChangePrice}
                            className={styles.price__input}
                          />
                        </div>
                        <div
                          style={{ width: "50%" }}
                          className={styles.input_wrap}
                        >
                          <p className={styles.amount}>Davomiylik</p>
                          <select
                            ref={courseMuddatiRef}
                            className={styles.second}
                            name=""
                            id=""
                          >
                            <option value="1">1 oy</option>
                            <option value="3">2 oy</option>
                            <option value="6">3 oy</option>
                            <option value="9">4 oy</option>
                            <option value="1">5 oy</option>
                            <option value="3">6 oy</option>
                            <option value="6">7 oy</option>
                            <option value="9">8 oy</option>
                            <option value="12">9 oy</option>
                            <option value="1">10 oy</option>
                            <option value="3">11 oy</option>
                            <option value="6">12 oy</option>
                            <option value="forewer">umrbod</option>
                          </select>
                        </div>
                      </div>
                      <p style={{ width: "100%" }} className={styles.amount}>
                        Sotuv narxi:{narx * 1.25} so'm
                      </p>
                    </div>
                  </div>
                  <div className={styles.muqova_wrapper}>
                    <div style={{ display: "flex" }}></div>
                    <div
                      className={styles.extra_div}
                      style={{ display: "block" }}
                    ></div>
                  </div>
                </div>

                <button className={styles.btn} type="submit">
                  KURSNI YARATISH
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div ref={modalRef} className={styles.free_modal}>
        {upload == 0 ? (
          <div className={styles.free_modal_content}>
            <p>Bu kursni haqiqatdan yuklamoqchimisiz?</p>
            <div className={styles.free_modal_wrap}>
              <button onClick={() => (modalRef.current.style.display = "none")}>
                YO'Q
              </button>
              <button>HA</button>
            </div>
          </div>
        ) : (
          ""
        )}
        {upload == 1 ? (
          <div className={styles.free_modal_content}>
            <p>
              Yuklanmoqda{" "}
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </p>
          </div>
        ) : (
          ""
        )}
        {upload == 2 ? (
          <div className={styles.free_modal_content}>
            <p>Xatolik yuz berdi</p>
            <div className={styles.free_modal_wrap}>
              <button
                onClick={() => {
                  modalRef.current.style.display = "none";
                  setupload(0);
                }}
              >
                Orqaga
              </button>
              <button style={{ display: "none" }}></button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default PaidCourseDownload;
