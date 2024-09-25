import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SliderComponent from "./CustomSlider";
import Slider from "@mui/material/Slider";
import Loading from "../loading/Loading";
import FullscreenRounded from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRounded from "@mui/icons-material/FullscreenExitRounded";

const VideoPlayerComponent = (props) => {
  const videoUrls = props.urls;
  const videoDurations = props.durations;
  const activeVideoRef = useRef(null);
  if (!videoUrls.length) {
    return;
  }
  const hoverRefSlider = useRef(null);
  const playerRef = useRef(null);

  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [allendingvideolength, setAllEndingVideoLength] = useState(0);
  const [videostimearr, setVideoTimeArr] = useState([]);
  const [volume, setVolume] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const videos = document.getElementsByClassName("videoplayerr");

    const handleLoadedMetadata = () => {
      let sumAllVideosTime = 0;
      let timeArr = [];

      for (let i = 0; i < videos.length; i++) {
        sumAllVideosTime += videoDurations[i];
        timeArr.push(sumAllVideosTime);
      }

      setVideoTimeArr(timeArr);

      setDuration(sumAllVideosTime);
      if (activeVideoRef.current) {
        activeVideoRef.current.muted = true;
        activeVideoRef.current.play();
      }
      // videos[currentVideoIndex].play();
      // activeVideoRef.current.play();
      // setPaused(false);
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
    hoverRefSlider.current?.classList.remove("hidden");
  };
  const removeClassHandle = () => {
    hoverRefSlider.current?.classList.add("hidden");
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (activeVideoRef.current) {
      activeVideoRef.current.volume = newValue;
      if (newValue > 0) {
        activeVideoRef.current.muted = false; // Ovoz balandligi 0 bo'lmasa mutedni olib tashlaymiz
      }
    }
  };

  // Full-screen funksiyasi
  const toggleFullScreen = () => {
    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if (playerRef.current.mozRequestFullScreen) {
        // Firefox
        playerRef.current.mozRequestFullScreen();
      } else if (playerRef.current.webkitRequestFullscreen) {
        // Chrome, Safari & Opera
        playerRef.current.webkitRequestFullscreen();
      } else if (playerRef.current.msRequestFullscreen) {
        // IE/Edge
        playerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  return (
    <div className="h-[30dvh] sm:h-[56dvh]" onMouseEnter={addClassHandle} onMouseLeave={removeClassHandle}>
      <Box
        ref={playerRef} // Full-screen holatiga olish uchun
        onContextMenu={(e) => {
          e.preventDefault();
          ("return: false");
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          // weight: "100%",
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
              <div key={videoUrl} className="h-full">
                {!duration ? (
                  <div style={{width: "48px", height: "48px"}} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Loading />
                  </div>
                ) : (
                  ""
                )}
                <video
                  onContextMenu={(e) => {
                    e.preventDefault();
                    ("return: false");
                  }}
                  ref={activeVideoRef}
                  width="auto"
                  muted={true}
                  autoPlay={true}
                  className={`videoplayerr mx-auto ${!isFullscreen && "max-h-[56dvh]"}`} 
                  style={{ height: "100%" }}
                  onEnded={handleEnded}
                  src={videoUrl}
                />
              </div>
            ) : (
              <video
                width="100%"
                onContextMenu={(e) => {
                  e.preventDefault();
                  ("return: false");
                }}
                className="videoplayerr"
                style={{ display: "none" }}
                height="auto"
                key={videoUrl}
                muted
                onEnded={handleEnded}
                src={videoUrl}
              />
            )
          )}
          {duration ? (
            <div key={videoUrls} ref={hoverRefSlider}>
              <div className="custom_video_slider_class">
                <SliderComponent
                  position={position}
                  videostimearr={videostimearr}
                  duration={duration}
                  setPosition={setPosition}
                  currentVideoIndex={currentVideoIndex}
                  setCurrentVideoIndex={setCurrentVideoIndex}
                />

                <div className="absolute bottom-[-5px] left-0 flex items-center gap-4">
                  {/* play icon */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      aria-label={paused ? "play" : "pause"}
                      onClick={togglePlayPause}
                    >
                      {!paused ? (
                        <PauseRounded
                          sx={{ fontSize: "2rem", color: "#fff" }}
                        />
                      ) : (
                        <PlayArrowRounded
                          sx={{ fontSize: "2rem", color: "#fff" }}
                        />
                      )}
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p className="px-1 text-sm">
                      {formatDuration(Math.floor(position))}
                    </p>{" "}
                    /
                    <p className="px-1 text-sm">
                      {formatDuration(Math.floor(duration))}
                    </p>
                  </Box>

                  <Box>
                    <Slider
                      value={volume}
                      onChange={handleVolumeChange}
                      aria-labelledby="continuous-slider"
                      min={0}
                      max={1}
                      step={0.01}
                      sx={{
                        width: 100,
                        color: "#fff",
                        fontSize: 10,
                        height: 2,
                        "& .MuiSlider-thumb": {
                          width: 10, // Thumb (dumaloq tugma) o'lchami
                          height: 10,
                          backgroundColor: "#fff", // Tugma rangi
                          "&:before": {
                            boxShadow: "none", // Tugma atrofi uchun soyani o'chirish
                          },
                          "&:after": {
                            width: 20, // Thumb atrofidagi dumaloq after element o'lchami
                            height: 20, // Thumb atrofidagi dumaloq after element o'lchami
                            backgroundColor: "rgba(255, 255, 255, 0.3)", // After elementining rangi
                          },
                        },
                      }}
                    />
                  </Box>
                </div>

                {/* <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
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
                      <PlayArrowRounded
                        sx={{ fontSize: "3rem", color: "#fff" }}
                      />
                    )}
                  </IconButton>
                </Box> */}
                {/* Full-screen tugmasi */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-5px",
                    right: "0px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    aria-label={
                      isFullscreen ? "exit full screen" : "full screen"
                    }
                    onClick={toggleFullScreen}
                  >
                    {!isFullscreen ? (
                      <FullscreenRounded
                        sx={{ fontSize: "2rem", color: "#fff" }}
                      />
                    ) : (
                      <FullscreenExitRounded
                        sx={{ fontSize: "2rem", color: "#fff" }}
                      />
                    )}
                  </IconButton>
                </Box>
                {/* Volume slider */}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Box>
    </div>
  );
};

export default VideoPlayerComponent;
