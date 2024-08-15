import React, { useRef, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
const CourseFragment = () => {
  const modalRef = useRef();
  const isOpenRef = useRef();
  const fileInputRef = useRef();
  const nameRef = useRef();
  const descRef = useRef();

  const [upload, setupload] = useState(0);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
    localStorage.removeItem("lesson_count");
  };

  const onSendForm = (e) => {
    e.preventDefault();
  };

  const handleCourseFragment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const id = localStorage.getItem("id");

    formData.append("videofile", e.target[3].files[0]);
    formData.append("videoName", e.target[0].value);
    formData.append("videoDesc", e.target[1].value);
    formData.append("isOpen", e.target[4].value);

    axios
      .post(`${import.meta.env.VITE_API_KEY}/courses-divid/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setCount((prev) => prev + 1);
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const finishCourseDownload = () => {
    const id = localStorage.getItem("id");
    if(!id){
      return;
    }
    if (
      fileInputRef.current.files[0] &&
      nameRef.current.value &&
      descRef.current.value
    ) {
      const formData = new FormData();
      formData.append("videofile", fileInputRef.current.files[0]);
      formData.append("videoName", nameRef.current.value);
      formData.append("videoDesc", descRef.current.value);
      formData.append("isOpen", isOpenRef.current.value);
      axios
        .post(`${import.meta.env.VITE_API_KEY}/courses-divid/${id}`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setCount(1);
          e.target.reset();
          // stopCourseDownload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const stopCourseDownload = () => {
    const id = localStorage.getItem("id");
    if(!id){
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_KEY}/courses-finish/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("lesson_count");
        localStorage.removeItem("id");
        navigate("/free/success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="app-content">
        <div className="global_wrap">
          <div className="process_free_wrap">
            <div className="fragment_video_download">
              <button onClick={onBack} className="back">
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              <h2>{count} - darsni yuklash</h2>
              <form
                onSubmit={(e) => handleCourseFragment(e)}
                className="process_free_form"
              >
                <div className="free_input_wrap">
                  <label htmlFor="name">Video dars nomi</label>
                  <input ref={nameRef} type="text" id="name" />
                </div>
                <div className="free_input_wrap">
                  <label htmlFor="about">Video dars haqida</label>
                  <textarea ref={descRef} name="about" id="about"></textarea>
                </div>
                <div className="flex items-center gap-5 sm:mb-10 mb-5">
                  <Button
                    icon={<DownloadOutlined />}
                    size={"large"}
                    className="text-white sm:w-1/4 w-1/2 file_input_wrap relative bg-[#40325d] hover:bg-white hover:text-[#40325d]"
                  >
                    Video yuklash
                    <input
                      type="file"
                      placeholder=""
                      accept="video/*"
                      className=""
                      ref={fileInputRef}
                    />
                  </Button>
                  <select
                    className="open_close_select w-1/2 sm:w-1/4"
                    defaultValue={true}
                    ref={isOpenRef}
                    id=""
                  >
                    <option value="true">
                      <span className="material-symbols-outlined">Ochiq</span>
                    </option>
                    <option value="false">
                      <span className="material-symbols-outlined">Yopiq</span>
                    </option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 sm:gap-5">
                  <button
                    onClick={stopCourseDownload}
                    className="save-btn"
                    type="button"
                  >
                    Saqlash
                  </button>
                  <button className="save-btn" type="submit">
                    Keyingisi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div ref={modalRef} className="free_modal hidden">
        {upload == 0 ? (
          <div className="free_modal_content">
            <p>Bu kursni haqiqatdan yuklamoqchimisiz?</p>
            <div className="free_modal_wrap">
              <button onClick={() => (modalRef.current.style.display = "none")}>
                YO'Q
              </button>
              <button onClick={onSendForm}>HA</button>
            </div>
          </div>
        ) : (
          ""
        )}
        {upload == 1 ? (
          <div className="free_modal_content">
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
          <div className="free_modal_content">
            <p>Xatolik yuz berdi</p>
            <div className="free_modal_wrap">
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

      {/* <div className="free_modal hidden">
        <div className="free_modal_content">
          <p>Bu kursni haqiqatdan yuklamoqchimisiz?</p>
          <div className="free_modal_wrap">
            <button onClick={() => navigate(-1)}>YO'Q</button>
            <button onClick={() => navigate("/free/success")}>HA</button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CourseFragment;
