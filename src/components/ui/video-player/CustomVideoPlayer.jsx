import React, { useState, useRef, useEffect } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Typography from "@mui/material/Typography";
import SliderComponent from "./CustomSlider";

const theme = createTheme();

const Widget = styled("div")(({ theme }) => ({
  // padding: 16,
  // borderRadius: 16,
  // width: "80%",
  // maxWidth: "100%",
  // margin: "auto",
  // position: "relative",
  // zIndex: 1,
  // backgroundColor:
  //   theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  // backdropFilter: "blur(40px)",
}));

const TinyText = styled(Typography)({
  // fontSize: "0.75rem",
  // opacity: 0.38,
  // fontWeight: 500,
  // letterSpacing: 0.2,
});

const VideoPlayerComponent = (props) => {
  console.log(props)
  const videoUrls = props.urls;

  const videoRef = useRef(null);
  const videosParentRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [allendingvideolength, setAllEndingVideoLength] = useState(0);
  const [videostimearr, setVideoTimeArr] = useState([]);

  useEffect(() => {
    const videos = document.getElementsByClassName("videoplayerr");

    const handleLoadedMetadata = () => {
      let sumAllVideosTime = 0;
      let timeArr = [];

      for (let i = 0; i < videos.length; i++) {
        const videoDuration = videos[i].duration;
        if (Number(videoDuration)) {
          sumAllVideosTime += videoDuration;
          timeArr.push(sumAllVideosTime);
        }

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
    videoRef.current.controls = false;
    setPaused(false);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentVideoIndex]);

  const handleEnded = () => {
    const currentVideoDuration = document.getElementsByClassName("videoplayerr")[currentVideoIndex].duration;

    // Avvalgi barcha videolar davomiyligini umumiy yig'indi sifatida saqlaymiz
    setAllEndingVideoLength(allendingvideolength + currentVideoDuration);

    // Agar boshqa video mavjud bo'lsa, keyingi videoga o'tamiz
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      const nextVideo = document.getElementsByClassName("videoplayerr")[currentVideoIndex + 1];
      nextVideo.play();
    }
  };

  const togglePlayPause = () => {
    const video = document.getElementsByClassName("videoplayerr")[currentVideoIndex];
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
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
          backgroundColor: "#f0f0f0",
          position: "relative"
        }}
      >
        <Widget>
          <div ref={videosParentRef}>
            {videoUrls.map((videoUrl) => (
              <video key={videoUrl} className="hidden" width="100%" height="auto" src={videoUrl} />
            ))}
          </div>
          {videoUrls.map((videoUrl, index) => (
            index === currentVideoIndex ?
              <video
                ref={videoRef}
                width="100%"
                key={videoUrl}
                className="videoplayerr"
                style={{ display: "block" }} // faqat joriy video ko'rinadi
                height="auto"
                onEnded={handleEnded}
                src={videoUrl}
              /> : <video
                ref={videoRef}
                width="100%"
                key={videoUrl}
                className="videoplayerr"
                style={{ display: "none" }} // faqat joriy video ko'rinadi
                height="auto"
                muted
                onEnded={handleEnded}
                src={videoUrl}
              />
          ))}
          <SliderComponent
            position={position}
            videostimearr={videostimearr}
            duration={duration}
            setPosition={setPosition}
            currentVideoIndex={currentVideoIndex}
            videoRef={videoRef}
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
            <TinyText>{formatDuration(Math.floor(position))}</TinyText>
            <TinyText>{formatDuration(Math.floor(duration))}</TinyText>
          </Box>
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
              {paused ? (
                <PlayArrowRounded sx={{ fontSize: "3rem" }} />
              ) : (
                <PauseRounded sx={{ fontSize: "3rem" }} />
              )}
            </IconButton>
          </Box>
        </Widget>
      </Box>
    </ThemeProvider>
  );
};

export default VideoPlayerComponent;
