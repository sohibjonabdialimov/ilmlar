import React, { useState, useRef, useEffect } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import Typography from "@mui/material/Typography";

const theme = createTheme();

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: "80%",
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const VideoPlayer = () => {
  const videoUrls = [
    "http://static.kremlin.ru/media/events/video/ru/video_low/btQlxg5CoYIFvpf6iSYs2WqLqqLe1hNH.mp4", // First video URL
    "http://static.kremlin.ru/media/events/video/ru/video_low/kmkoPsYdq7EoAhOAac6COZaNZ4OV6vSA.mp4", // Second video URL
  ];
  const videoRef = useRef(null);
  const videosParentRef = useRef(null);
  const sliderRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    videoRef.current.controls = false;
    // video.play();
    setPaused(false);

    // console.dir(videosParentRef.current.childNodes);

    const handleLoadedMetadata = () => {
      // setDuration(video.duration);
      let sumAllVideosTime = 0;
      videosParentRef.current.childNodes.forEach((element) => {
        sumAllVideosTime += element.duration;
      });

      setDuration(sumAllVideosTime);
    };

    const handleTimeUpdate = () => {
      setPosition(video.currentTime);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleEnded = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
    console.dir((sliderRef.current.children[2].childNodes.value = 20));

    // sliderRef.current.value = 10;
  };

  const handleSliderChange = (_, value) => {
    console.log(value);

    setPosition(value);
    videoRef.current.currentTime = value;
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
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
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Widget>
          <div ref={videosParentRef}>
            {videoUrls.map((videoUrl) => {
              return (
                <video
                  key={videoUrl}
                  className="hidden"
                  width="100%"
                  height="auto"
                  src={videoUrl}
                />
              );
            })}
          </div>
          <video
            ref={videoRef}
            width="100%"
            height="auto"
            autoPlay
            onEnded={handleEnded}
            src={videoUrls[currentVideoIndex]}
          />

          <Slider
            aria-label="time-indicator"
            size="small"
            ref={sliderRef}
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={handleSliderChange}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&::before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${
                    theme.palette.mode === "dark"
                      ? "rgb(255 255 255 / 16%)"
                      : "rgb(0 0 0 / 16%)"
                  }`,
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
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
              mt: -1,
            }}
          >
            <IconButton
              aria-label="previous"
              onClick={() => (videoRef.current.currentTime -= 10)}
            >
              <FastRewindRounded fontSize="large" />
            </IconButton>
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
            <IconButton
              aria-label="next"
              onClick={() => (videoRef.current.currentTime += 10)}
            >
              <FastForwardRounded fontSize="large" />
            </IconButton>
          </Box>
        </Widget>
      </Box>
    </ThemeProvider>
  );
};

export default VideoPlayer;
