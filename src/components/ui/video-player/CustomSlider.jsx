import React from "react";
import Slider from "@mui/material/Slider";

const CustomSlider = ({ position, duration, setCurrentVideoIndex, videostimearr, setPosition, currentVideoIndex, videoRef }) => {
  const handleSliderChange = (_, value) => {
    let index = currentVideoIndex;
    setPosition(value);  

    // To'g'ri videoni aniqlash
    for (let i = 0; i < videostimearr.length; i++) {
      if (value < videostimearr[i]) {
        index = i;
        break;
      }
    }

    // Agar boshqa videoga o'tilsa, indexni yangilash
    setCurrentVideoIndex(index);

    // Barcha videolarni pauza qilish
    const videos = document.getElementsByClassName("videoplayerr");
    Array.from(videos).forEach((video) => video.pause());

    // Yangi videoning to'g'ri vaqtini hisoblash
    const previousVideosDuration = videostimearr[index - 1] || 0;
    const currentVideoTime = value - previousVideosDuration;

    // Yangi videoni to'g'ri vaqtdan o'ynatish
    const videoElement = videos[index];
    videoElement.currentTime = currentVideoTime;
    videoElement.play();

    
};


  return (
    <Slider
      aria-label="time-indicator"
      size="small"
      value={position}
      min={0}
      step={1}
      max={duration}
      onChange={handleSliderChange}
      sx={{
        color: "rgba(0,0,0,0.87)",
        height: 4,
        "& .MuiSlider-thumb": {
          width: 8,
          height: 8,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          "&::before": {
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
          },
          "&:hover, &.Mui-focusVisible": {
            boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.16)",
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
  );
};

export default CustomSlider;
