import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function TeachUpdateonekurs() {
  const courseId = useParams().id;
  const modalRef = useRef();
  const titleInputRef = useRef();
  const isopenRef = useRef();
  const courseNameRef = useRef();
  const courseDescRef = useRef();
  const courseImgRef = useRef();
  const priceRef = useRef();
  const courseMuddatiRef = useRef();
  const descriptionInputRef = useRef();
  const [videoLessons, setVideoLessons] = useState([{ id: 1 }]);
  const [narx, setnarx] = useState(0);
  const [data, setdata] = useState({});

  const [videoDataArray, setVideoDataArray] = useState([]);
  const [videoINFO, setVideoINFO] = useState([]);
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  const addVideoLesson = (e) => {
    e.preventDefault();
    try {
      const title = titleInputRef.current.value;
      const description = descriptionInputRef.current.value;
      const isopen = isopenRef.current.value;

      if (!title) {
        toast("Iltimos, video nomini kiriting");
        return 0;
      } else if (!description) {
        toast("Iltimos, videoga izoh bering");
        return 0;
      }
      const newId = videoLessons.length + 1;
      const newVideoLesson = { id: newId };
      setVideoLessons([...videoLessons, newVideoLesson]);
      const videoData = {
        id: newId - 1,
        title,
        description,
        isopen,
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

  const names = [];
  const desc = [];
  const isopen = [];
  const onSendForm = async (e) => {
    await axios
      .put(
        `http://64.226.118.71:5001/courses/${courseId}`,
        {
          name: courseNameRef.current.value,
          desc: courseDescRef.current.value,
          muddati: courseMuddatiRef.current.value,
          narxi: priceRef.current.value * 1.25,
          vediosname: names,
          vediosdesc: desc,
          isopen: isopen,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Member updated successfully.");

          refreshUser(); // mutating the swr request
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    axios
      .post(
        "http://64.226.118.71:5001/courseone/me",
        { cursId: courseId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setdata(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    for (let i = 0; i < data?.vedios?.length; i++) {
      names.push(data.vedios[i].nomi);
      desc.push(data.vedios[i].desc);
      isopen.push(data.vedios[i].isOpen) || isopen.push(false);
    }
  }, [data]);

  const [image, setImage] = useState("");
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handlechangenarx = () => {
    if (priceRef?.current?.value) {
      setnarx(priceRef.current.value);
    }
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
            <h1>Kursni yangilash</h1>
            <form
              onSubmit={(e) => onHandleForm(e)}
              className={styles.kurs_yuklash_form}
            >
              <div className={styles.input_wrap}>
                <label htmlFor="amount">Kurs nomi</label>
                <input
                  ref={courseNameRef}
                  defaultValue={data.Kursname}
                  type="text"
                />
              </div>
              <div className={styles.input_wrap}>
                <label htmlFor="amount">Kurs haqida</label>
                <textarea
                  ref={courseDescRef}
                  defaultValue={data.Kursdesc}
                ></textarea>
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
                  <div
                    className={styles.extra_div}
                    style={{ display: "block" }}
                  >
                    <div className={styles.input_wrap}>
                      <p htmlFor="amount" className={styles.amount}>
                        Davomiylik
                      </p>
                      <select
                        defaultValue={data.muddati}
                        ref={courseMuddatiRef}
                        className={styles.second}
                        name=""
                        id=""
                      >
                        <option value={1}>1 oy</option>
                        <option value="3">3 oy</option>
                        <option value="6">6 oy</option>
                        <option value="9">9 oy</option>
                        <option value={12}>12 oy</option>
                        <option value="forewer">for ever</option>
                      </select>
                    </div>
                    <div
                      className={styles.input_wrap}
                      style={{ width: "150px" }}
                    >
                      <p htmlFor="amount" className={styles.amount}>
                        Narxi
                      </p>

                      <input
                        type="number"
                        defaultValue={data.narxi}
                        onChange={handlechangenarx}
                        style={{ minWidth: "100px" }}
                        ref={priceRef}
                      />
                      <p htmlFor="amount" className={styles.amount}>
                        sotuv narxi: {narx * 1.25} SO`M
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.videos}>
                  {data.vedios?.map((lesson, index) => (
                    <div className={styles.video_download} key={lesson.id}>
                      <p key={index}>{index + 1}-dars</p>
                      <div className={styles.free_video_input_wrapper}>
                        <input
                          defaultValue={lesson.nomi}
                          onBlur={(e) => {
                            names[index] = e.target.value;
                          }}
                          type="text"
                          placeholder="Enter video title"
                          ref={titleInputRef}
                          className={styles.video_download_input_title}
                        />
                        <input
                          type="text"
                          onBlur={(e) => {
                            desc[index] = e.target.value;
                          }}
                          defaultValue={lesson.desc}
                          placeholder="Enter video description"
                          ref={descriptionInputRef}
                          className={styles.video_download_input_desc}
                        />
                      </div>
                      <div className={styles.free_video_button_wrapper}>
                        <select
                          name=""
                          onBlur={(e) => {
                            isopen[index] = e.target.value;
                          }}
                          defaultValue={lesson.isOpen}
                          ref={isopenRef}
                          id=""
                        >
                          <option value={false}>
                            <span class="material-symbols-outlined">yopiq</span>
                          </option>
                          <option value={true}>
                            <span class="material-symbols-outlined">ochiq</span>
                          </option>
                        </select>
                        <div className={styles.plus_minus}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.btn} type="submit">
                KURSNI YANGILASH
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

export default TeachUpdateonekurs;
