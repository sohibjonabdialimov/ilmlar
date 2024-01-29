import React, { useState } from "react";
import styles from "./free.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./style.css";

function FreeCourseDownload() {
  const modalRef = useRef();
  const titleInputRef = useRef();
  const courseNameRef = useRef();
  const courseDescRef = useRef();
  const courseImgRef = useRef();
  const coursevideoRef = useRef();
  const courseMuddatiRef = useRef();
  const descriptionInputRef = useRef();
  const isopenRef = useRef();
  const fileInputRef = useRef();
  const [videoLessons, setVideoLessons] = useState([{ id: 1 }]);
  const [videoDataArray, setVideoDataArray] = useState([]);
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/teacher/kurs");
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const addVideoLesson = (e) => {
    e.preventDefault();
    try {
      const title = titleInputRef.current.value;
      const description = descriptionInputRef.current.value;
      const file = fileInputRef.current.files[0];
      const isopen = isopenRef.current.value
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
        isopen
      };

      setVideoDataArray((prevData) => [...prevData, videoData]);
    } catch (error) {
      const newId = videoLessons.length + 1;
      const newVideoLesson = { id: newId };
      setVideoLessons([...videoLessons, newVideoLesson]);
    }
  };
  const handleRemoveVideoLesson = (id) => {
    const updatedVideoLessons = videoLessons.filter(
      (lesson, index) => index !== id - 1
    );
    setVideoLessons(updatedVideoLessons);
    const updatedVideoDataArray = videoDataArray.filter(
      (videoData) => videoData.id !== id
    );
    setVideoDataArray(updatedVideoDataArray);
  };
  const handleVideoLessonUpload = () => {
    navigate("/teacher/processfreedownload");
  };

  const onHandleForm = (e) => {
    e.preventDefault();
    modalRef.current.style.display = "flex";
  };
  const onSendForm = () => {
    const formData = new FormData();
    formData.append("obloshka", courseImgRef.current.files[0]);
    if( coursevideoRef.current.files[0]){
      formData.append("treeler", coursevideoRef.current.files[0]);
    }
    formData.append("name", courseNameRef.current.value);
    formData.append("desc", courseDescRef.current.value);
    formData.append("narxi", 0);
    formData.append("muddati", courseMuddatiRef.current.value);

    for (let i = 0; i < videoDataArray.length; i++) {
      const videoData = videoDataArray[i];
      formData.append("vediosdesc", videoData.description);
      formData.append("vediosname", videoData.title);
      formData.append("isOpen", videoData.isopen);
      if (videoData.file) {
        formData.append("file", videoData.file);
      } else {
        console.error(`Missing file for video data at index ${i}`);
      }

    }

    axios
      .post("https://api.ilmlar.com/courses/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/free/success");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [image, setImage] = useState("");
  const [video, setvideo] = useState("");

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
   const handleInputvChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setvideo(reader.result);
    };
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="app-content">
        <div className={styles.free_global_wrap}>
          <div className={styles.kurs_yuklash}>
            <button onClick={onBack} className={styles.back}>
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <h1>Tekin kurs yuklash</h1>
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
                <div className={styles.muqova_wrapper}>
                  <div className={styles.input_file}>
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
                  <div className={styles.input_file}>
                    {!video && <p>Treeler kiritish ixtiyoriy</p>}
                    <input
                      onChange={handleInputvChange}
                      ref={coursevideoRef}
                      type="file"
                      placeholder="Treeler kiritish ixtiyoriy"
                      accept="video/*"
                    />
                    {video && (
                      <div style={{ height: "100%" }}>
                        <video
                        autoPlay
                        muted
                          src={video}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    )}

                  </div>
                  <div className={styles.extra_div}>
                    <div className={styles.input_wrap}>
                      <p htmlFor="amount" className={styles.amount}>
                        Davomiylik
                      </p>
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
                </div>
                <div className={styles.videos}>
                  {videoLessons.map((lesson, index) => (
                    <div className={styles.video_download} key={lesson.id}>
                      <p key={index}>{index + 1}-dars</p>
                      <div className={styles.free_video_input_wrapper}>
                        <input
                          type="text"
                          placeholder="Enter video title"
                          ref={titleInputRef}
                          className={styles.video_download_input_title}
                        />
                        <input
                          type="text"
                          placeholder="Enter video description"
                          ref={descriptionInputRef}
                          className={styles.video_download_input_desc}
                        />
                      </div>
                      <div className={styles.free_video_button_wrapper}>
                        <input
                          type="file"
                          placeholder="Muqova uchun video"
                          accept="video/*"
                          className={styles.video_download_input_file}
                          ref={fileInputRef}
                        />
                        {/* <input type="radio" ref={isopenRef} id="ochiq" name="isopen" value="true" />
                        <label for="ochiq"><span class="material-symbols-outlined">
                          visibility
                        </span></label>

                        <input type="radio" ref={isopenRef} id="yopiq" name="isopen" value="false" />
                        <label for="yopiq"><span class="material-symbols-outlined">
                          visibility_off
                        </span></label> */}

                        <select name="" ref={isopenRef} id="">

                          <option value="false"><span class="material-symbols-outlined">
                            yopiq
                          </span></option>
                          <option value="true"><span class="material-symbols-outlined">
                            ochiq
                          </span></option>
                        </select>
                        <div className={styles.plus_minus}>
                          <button
                            type="button"
                            onClick={() => handleRemoveVideoLesson(lesson.id)}
                            className={`${styles.plus_btn} ${styles.minus_btn}`}
                          >
                            <ion-icon name="remove-outline"></ion-icon>
                          </button>
                          <button
                            type="submit"
                            onClick={addVideoLesson}
                            className={styles.plus_btn}
                          >
                            <ion-icon name="add-outline"></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.btn} type="submit">
                KURSNI YUKLASH
              </button>
            </form>
          </div>
        </div>
      </div>

      <div ref={modalRef} className={styles.free_modal}>
        <div className={styles.free_modal_content}>
          <p>Bu kursni haqiqatdan yuklamoqchimisiz?</p>
          <div className={styles.free_modal_wrap}>
            <button onClick={() => (modalRef.current.style.display = "none")}>
              YO'Q
            </button>
            <button onClick={() => onSendForm()}>HA</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FreeCourseDownload;
