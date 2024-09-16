import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./courseInfo.css";
import VideosNavbar from "../../../components/videosTeacherNavbar/VideosNavbar";

import styles from "./courseInfo.module.css";
import axios from "axios";
import MobileHeader from "../../../components/mobileHeader/mobileHeader";
import CustomVideo from "../../../components/ui/video-player/CustomVideo";

function CourseInfo() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState([]);
  const [courseIndex, setCourseIndex] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState({});

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
      .post(
        "https://api.ilmlar.com/courseone/me",
        { cursId: courseId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setCourseData(res.data.vedios);
        setSelectedVideo(res.data.vedios[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId]);

  const next = () => {
    if (courseData.length > courseIndex) {
      setCourseIndex(courseIndex + 1);
      setSelectedVideo(courseData[courseIndex]);
    }
  };


  const handleVideoSelection = (video) => {
    setSelectedVideo(video);
  };
  const handleCourseIndex = (index) => {
    setCourseIndex(index);
  };
  const onBack = () => {
    navigate(-1);
  };
  // const urls = [
  //   "http://static.kremlin.ru/media/events/video/ru/video_low/btQlxg5CoYIFvpf6iSYs2WqLqqLe1hNH.mp4",
  //   "http://static.kremlin.ru/media/events/video/ru/video_low/kmkoPsYdq7EoAhOAac6COZaNZ4OV6vSA.mp4",
  // ];
  return (
    <div className="app-content">
      <div className="course_info">
        <button onClick={onBack} className="back1">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <div className={modal ? "def2 modal-navbar" : "def2 yoq"}>
          <VideosNavbar
            courseData={courseData}
            handleVideoSelection={handleVideoSelection}
            handleCourseIndex={handleCourseIndex}
            changeModal={changeModal}
            courseIndex={courseIndex}
            modal={modal}
          />
        </div>
        <div
          className={
            modal || modalDarslar ? "blur main_lesson mobile" : " main_lesson"
          }
        >
          <div style={{ display: "flex" }}>
            <button onClick={onBack} className={styles.back}>
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <div className="mobile_width_class">
              <MobileHeader
                changeModalDars={changeModal}
                changeModal={changeModalDars}
                modal={modal}
                modalDarslar={modalDarslar}
                type={"Video dars"}
                wherey="teach"
              />
            </div>
          </div>
          <div className="video_information video_information_scroll">
            <CustomVideo videosrc={selectedVideo?.orni} />
            {/* <ReactPlayer
              playing={true}
              url={`${import.meta.env.VITE_API_KEY}/${deleteplatforma(
                selectedVideo.orni
              )}`}
              alt="Video"
              onEnded={() => {
                next();
              }}
              width="100%"
              muted={true}
              controls
              onContextMenu={(e) => e.preventDefault()}
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
            /> */}
            {/* <video
                src={`https://api.ilmlar.com/${deleteplatforma(
                  selectedVideo.orni
                )}`}
                alt=""
                disablePictureInPicture
                playbackRate={3}
                controls
                controlsList="nodownload"
              /> */}

            <div className="video_information_content">
              <h3>
                {courseIndex} - dars. {selectedVideo?.nomi}
              </h3>
              <p>{selectedVideo?.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
