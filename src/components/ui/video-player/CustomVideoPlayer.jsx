import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SliderComponent from "./CustomSlider";

const VideoPlayerComponent = (props) => {
  const videoUrls = props.urls;
  const videoDurations = props.durations;
  console.log(videoDurations, videoUrls);
  const activeVideoRef = useRef(null);
  if (!videoUrls.length) {
    return;
  }
  const hoverRefSlider = useRef(null);

  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [allendingvideolength, setAllEndingVideoLength] = useState(0);
  const [videostimearr, setVideoTimeArr] = useState([]);

  useEffect(() => {
    const videos = document.getElementsByClassName("videoplayerr");
    console.dir(activeVideoRef.current);
    
    
    const handleLoadedMetadata = () => {
      let sumAllVideosTime = 0;
      let timeArr = [];
      
      for (let i = 0; i < videos.length; i++) {
        sumAllVideosTime += videoDurations[i];
        timeArr.push(sumAllVideosTime);
      }

      setVideoTimeArr(timeArr);

      setDuration(sumAllVideosTime);
    };
    const handleTimeUpdate = () => {
      const videos = document.getElementsByClassName("videoplayerr");
      
      let currentTime = 0;

      // Avvalgi barcha videolarning davomiyligini yig'amiz
      for (let i = 0; i < currentVideoIndex; i++) {
        currentTime += videos[i].duration;
      }

      // Joriy videoning vaqtini ham qo'shamiz
      currentTime += videos[currentVideoIndex].currentTime;

      // Slayder pozitsiyasini umumiy vaqtni ko'rsatadigan qilib yangilaymiz
      setPosition(currentTime);
    };

    const video = videos[currentVideoIndex];
    activeVideoRef.current.controls = false;
    setPaused(false);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentVideoIndex]);

  const handleEnded = () => {
    const currentVideoDuration =
      document.getElementsByClassName("videoplayerr")[currentVideoIndex]
        .duration;

    // Avvalgi barcha videolar davomiyligini umumiy yig'indi sifatida saqlaymiz
    setAllEndingVideoLength(allendingvideolength + currentVideoDuration);

    // Agar boshqa video mavjud bo'lsa, keyingi videoga o'tamiz
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      const nextVideo =
        document.getElementsByClassName("videoplayerr")[currentVideoIndex + 1];
      nextVideo.play();
    }
  };

  const togglePlayPause = () => {
    const video =
      document.getElementsByClassName("videoplayerr")[currentVideoIndex];
    if (paused) {
      video.play();
    } else {
      video.pause();
    }
    setPaused(!paused);
  };

  const formatDuration = (value) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };
  const addClassHandle = () => {
    hoverRefSlider.current.classList.remove("hidden");
  };
  const removeClassHandle = () => {
    hoverRefSlider.current.classList.add("hidden");
  };
  return (
    <div onMouseEnter={addClassHandle} onMouseLeave={removeClassHandle}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
          backgroundColor: "#f0f0f0",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#453862",
            position: "relative",
          }}
        >
          {videoUrls?.map((videoUrl, index) =>
            index === currentVideoIndex ? (
              <video
                ref={activeVideoRef}
                width="auto"
                key={videoUrl}
                className="videoplayerr h-full mx-auto"
                style={{ display: "block" }}
                onEnded={handleEnded}
                src={videoUrl}
              />
            ) : (
              <video
                width="100%"
                key={videoUrl}
                className="videoplayerr"
                style={{ display: "none" }}
                height="auto"
                muted
                onEnded={handleEnded}
                src={videoUrl}
              />
            )
          )}
          <div ref={hoverRefSlider}>
            <div className="absolute w-full bottom-0 h-[50px]">
              <SliderComponent
                position={position}
                videostimearr={videostimearr}
                duration={duration}
                setPosition={setPosition}
                currentVideoIndex={currentVideoIndex}
                setCurrentVideoIndex={setCurrentVideoIndex}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: -2,
                }}
              >
                <p className="px-3">{formatDuration(Math.floor(position))}</p>
                <p className="px-3">{formatDuration(Math.floor(duration))}</p>
              </Box>
            </div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                mt: -1,
              }}
            >
              <IconButton
                aria-label={paused ? "play" : "pause"}
                onClick={togglePlayPause}
              >
                {!paused ? (
                  <PauseRounded sx={{ fontSize: "3rem", color: "#fff" }} />
                ) : (
                  <PlayArrowRounded sx={{ fontSize: "3rem", color: "#fff" }} />
                )}
              </IconButton>
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default VideoPlayerComponent;
